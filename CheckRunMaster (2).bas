' ============================================================
' CHECK RUN MASTER SYSTEM
' ============================================================
' Place all code in a standard module in your .xlsm
'
' SHEETS (created automatically):
'   Master       - one row per VendorID+CompanyID
'   ChangeLog    - every master change logged with date
'   CurrentWeek  - flattened check run output
'
' MACROS:
'   BuildMasterFromHistory  - ONE TIME: seed Master from last 52 files
'   RunWeeklyCheckRun       - WEEKLY: transform + validate + fill
'
' MASTER COLUMNS:
'   A=VendorID  B=CompanyID  C=VendorName  D=PaymentMethod
'   E=Account  F=DateOtherThanCurrent  G=SeparateCheck  H=ChecksAreFor
'   I=InvoiceFormats (pipe-delimited)  J=InvoiceExamples (pipe-delimited)
'   K=LastUpdated
' ============================================================

Option Explicit

Private Const FOLDER_PATH As String = "\\svr-ess-lk-dc1\LKPublic\Rivka Bensalmon\Rachel B\check run reports\"

' -----------------------------------------------------------
' HELPERS
' -----------------------------------------------------------
Private Sub EnsureSheets()
    Dim wb As Workbook: Set wb = ThisWorkbook
    Dim h As Long
    
    If Not SheetExists("Master") Then
        Dim wsM As Worksheet
        Set wsM = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count))
        wsM.Name = "Master"
        wsM.Columns("A").NumberFormat = "@"
        Dim mHeaders As Variant
        mHeaders = Array("VendorID", "CompanyID", "VendorName", "PaymentMethod", _
                         "Account", "DateOtherThanCurrent", "SeparateCheck", _
                         "ChecksAreFor", "InvoiceFormats", "InvoiceExamples", "LastUpdated")
        For h = 0 To UBound(mHeaders)
            wsM.Cells(1, h + 1).Value = mHeaders(h)
        Next h
        wsM.Range("A1:K1").Font.Bold = True
    End If
    
    If Not SheetExists("ChangeLog") Then
        Dim wsL As Worksheet
        Set wsL = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count))
        wsL.Name = "ChangeLog"
        Dim lHeaders As Variant
        lHeaders = Array("Date", "VendorID", "CompanyID", "VendorName", _
                         "FieldChanged", "OldValue", "NewValue", "Action")
        For h = 0 To UBound(lHeaders)
            wsL.Cells(1, h + 1).Value = lHeaders(h)
        Next h
        wsL.Range("A1:H1").Font.Bold = True
        wsL.Columns("A").NumberFormat = "m/d/yyyy h:mm AM/PM"
    End If
    
    If Not SheetExists("CurrentWeek") Then
        Dim wsC As Worksheet
        Set wsC = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count))
        wsC.Name = "CurrentWeek"
    End If
End Sub

Private Function SheetExists(sName As String) As Boolean
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets(sName)
    On Error GoTo 0
    SheetExists = Not ws Is Nothing
End Function

Private Sub LogChange(vendorID As String, companyID As String, vendorName As String, _
                      fieldChanged As String, oldVal As String, newVal As String, action As String)
    Dim wsL As Worksheet: Set wsL = ThisWorkbook.Sheets("ChangeLog")
    Dim nr As Long: nr = wsL.Cells(wsL.Rows.Count, 1).End(xlUp).Row + 1
    wsL.Cells(nr, 1).Value = Now
    wsL.Cells(nr, 2).Value = vendorID
    wsL.Cells(nr, 3).Value = companyID
    wsL.Cells(nr, 4).Value = vendorName
    wsL.Cells(nr, 5).Value = fieldChanged
    wsL.Cells(nr, 6).Value = oldVal
    wsL.Cells(nr, 7).Value = newVal
    wsL.Cells(nr, 8).Value = action
End Sub

' -----------------------------------------------------------
' Build a Dictionary of Master keys for fast lookup
' Key = "VendorID|CompanyID", Value = row number
' -----------------------------------------------------------
Private Function BuildMasterDict() As Object
    Dim dict As Object: Set dict = CreateObject("Scripting.Dictionary")
    dict.CompareMode = vbTextCompare
    Dim wsM As Worksheet: Set wsM = ThisWorkbook.Sheets("Master")
    Dim lr As Long, i As Long, k As String
    lr = wsM.Cells(wsM.Rows.Count, 1).End(xlUp).Row
    For i = 2 To lr
        k = Trim(CStr(wsM.Cells(i, 1).Value & "")) & "|" & Trim(CStr(wsM.Cells(i, 2).Value & ""))
        If Not dict.exists(k) Then dict.Add k, i
    Next i
    Set BuildMasterDict = dict
End Function

' -----------------------------------------------------------
' Find row via Dictionary (fast) - returns row or 0
' -----------------------------------------------------------
Private Function FindMasterRowDict(dict As Object, vendorID As String, companyID As String) As Long
    Dim k As String
    k = Trim(vendorID) & "|" & Trim(companyID)
    If dict.exists(k) Then
        FindMasterRowDict = dict(k)
    Else
        FindMasterRowDict = 0
    End If
End Function

' -----------------------------------------------------------
' CLASSIFY INVOICE - structure + length for pure N or A
' -----------------------------------------------------------
Private Function ClassifyInvoice(inv As Variant) As String
    Dim s As String, i As Long, c As String
    Dim pattern As String, lastType As String, curType As String
    s = Trim(CStr(inv & ""))
    If Len(s) = 0 Then ClassifyInvoice = "": Exit Function
    pattern = "": lastType = ""
    For i = 1 To Len(s)
        c = Mid(s, i, 1)
        If c Like "[0-9]" Then
            curType = "N"
        ElseIf c Like "[A-Za-z]" Then
            curType = "A"
        ElseIf c = "/" Then
            curType = "/"
        ElseIf c = "-" Then
            curType = "-"
        ElseIf c = " " Then
            curType = " "
        ElseIf c = "." Then
            curType = "."
        Else
            curType = "?"
        End If
        If curType <> lastType Then pattern = pattern & curType: lastType = curType
    Next i
    ClassifyInvoice = pattern
    
    ' Normalize: patterns with only N and / (date-like) all become N/N
    Dim ch As String, onlyTest As Boolean
    onlyTest = True
    For i = 1 To Len(pattern)
        ch = Mid(pattern, i, 1)
        If ch <> "N" And ch <> "/" Then onlyTest = False: Exit For
    Next i
    If onlyTest And InStr(pattern, "/") > 0 Then ClassifyInvoice = "N/N": Exit Function
    
    ' Same for N and -
    onlyTest = True
    For i = 1 To Len(pattern)
        ch = Mid(pattern, i, 1)
        If ch <> "N" And ch <> "-" Then onlyTest = False: Exit For
    Next i
    If onlyTest And InStr(pattern, "-") > 0 Then ClassifyInvoice = "N-N": Exit Function
    
    ' Same for N and space
    onlyTest = True
    For i = 1 To Len(pattern)
        ch = Mid(pattern, i, 1)
        If ch <> "N" And ch <> " " Then onlyTest = False: Exit For
    Next i
    If onlyTest And InStr(pattern, " ") > 0 Then ClassifyInvoice = "N N": Exit Function
    
    ' Pure numeric or pure alpha: add character count
    If pattern = "N" Then ClassifyInvoice = "N(" & Len(s) & ")": Exit Function
    If pattern = "A" Then ClassifyInvoice = "A(" & Len(s) & ")": Exit Function
End Function

' -----------------------------------------------------------
' Check if a pattern exists in a pipe-delimited list
' -----------------------------------------------------------
Private Function PatternInList(pattern As String, pipeList As String) As Boolean
    If Len(pipeList) = 0 Then PatternInList = False: Exit Function
    Dim parts() As String, p As Long
    parts = Split(pipeList, "|")
    For p = LBound(parts) To UBound(parts)
        If Trim(parts(p)) = pattern Then
            PatternInList = True
            Exit Function
        End If
    Next p
    PatternInList = False
End Function

' -----------------------------------------------------------
' Add a pattern+example to Master row if not already there
' -----------------------------------------------------------
Private Function AddPatternToMaster(mRow As Long, pattern As String, example As String) As Boolean
    Dim wsM As Worksheet: Set wsM = ThisWorkbook.Sheets("Master")
    Dim curPatterns As String, curExamples As String
    curPatterns = Trim(CStr(wsM.Cells(mRow, 9).Value & ""))
    curExamples = Trim(CStr(wsM.Cells(mRow, 10).Value & ""))
    
    If PatternInList(pattern, curPatterns) Then
        AddPatternToMaster = False: Exit Function
    End If
    
    If Len(curPatterns) = 0 Then
        wsM.Cells(mRow, 9).Value = pattern
        wsM.Cells(mRow, 10).Value = CStr(example)
    Else
        wsM.Cells(mRow, 9).Value = curPatterns & "|" & pattern
        wsM.Cells(mRow, 10).Value = curExamples & "|" & CStr(example)
    End If
    AddPatternToMaster = True
End Function

' -----------------------------------------------------------
' Get sorted file list from folder
' -----------------------------------------------------------
Private Function GetSortedFiles(maxFiles As Long) As Variant
    Dim fso As Object, folder As Object, file As Object
    Dim fileList() As String, fileDate() As Date
    Dim fileCount As Long, i As Long, j As Long
    Dim tmpStr As String, tmpDate As Date
    Dim currentName As String, ext As String
    
    Set fso = CreateObject("Scripting.FileSystemObject")
    If Not fso.FolderExists(FOLDER_PATH) Then GetSortedFiles = Array(): Exit Function
    
    Set folder = fso.GetFolder(FOLDER_PATH)
    currentName = LCase(ThisWorkbook.Name)
    fileCount = 0
    
    For Each file In folder.Files
        If LCase(file.Name) Like "*check run*" Then
            ext = LCase(Mid(file.Name, InStrRev(file.Name, ".")))
            If ext = ".xls" Or ext = ".xlsx" Or ext = ".xlsm" Or ext = ".xlsb" Then
                If LCase(file.Name) <> currentName Then fileCount = fileCount + 1
            End If
        End If
    Next file
    
    If fileCount = 0 Then GetSortedFiles = Array(): Exit Function
    
    ReDim fileList(1 To fileCount): ReDim fileDate(1 To fileCount)
    i = 0
    For Each file In folder.Files
        If LCase(file.Name) Like "*check run*" Then
            ext = LCase(Mid(file.Name, InStrRev(file.Name, ".")))
            If ext = ".xls" Or ext = ".xlsx" Or ext = ".xlsm" Or ext = ".xlsb" Then
                If LCase(file.Name) <> currentName Then
                    i = i + 1: fileList(i) = file.Path: fileDate(i) = file.DateLastModified
                End If
            End If
        End If
    Next file
    
    For i = 1 To fileCount - 1
        For j = i + 1 To fileCount
            If fileDate(j) > fileDate(i) Then
                tmpStr = fileList(i): fileList(i) = fileList(j): fileList(j) = tmpStr
                tmpDate = fileDate(i): fileDate(i) = fileDate(j): fileDate(j) = tmpDate
            End If
        Next j
    Next i
    
    If fileCount > maxFiles Then fileCount = maxFiles
    Dim result() As String: ReDim result(1 To fileCount)
    For i = 1 To fileCount: result(i) = fileList(i): Next i
    GetSortedFiles = result
End Function

' -----------------------------------------------------------
' DEDUP MASTER: remove duplicate VendorID+CompanyID rows
' Keeps the row with the most data filled in
' -----------------------------------------------------------
Private Sub DedupMaster()
    Dim wsM As Worksheet: Set wsM = ThisWorkbook.Sheets("Master")
    Dim lr As Long, i As Long, j As Long
    Dim dict As Object: Set dict = CreateObject("Scripting.Dictionary")
    dict.CompareMode = vbTextCompare
    Dim k As String
    Dim dupes As Long: dupes = 0
    
    lr = wsM.Cells(wsM.Rows.Count, 1).End(xlUp).Row
    
    ' Pass 1: Find first occurrence of each key
    For i = 2 To lr
        k = Trim(CStr(wsM.Cells(i, 1).Value & "")) & "|" & Trim(CStr(wsM.Cells(i, 2).Value & ""))
        If Not dict.exists(k) Then
            dict.Add k, i
        End If
    Next i
    
    ' Pass 2: Mark duplicates for deletion (merge data into first occurrence)
    Dim keepRow As Long, c As Long
    For i = lr To 2 Step -1
        k = Trim(CStr(wsM.Cells(i, 1).Value & "")) & "|" & Trim(CStr(wsM.Cells(i, 2).Value & ""))
        keepRow = dict(k)
        If keepRow <> i Then
            ' Merge non-blank values from dupe into keeper
            For c = 3 To 11
                If Len(Trim(CStr(wsM.Cells(keepRow, c).Value & ""))) = 0 And _
                   Len(Trim(CStr(wsM.Cells(i, c).Value & ""))) > 0 Then
                    wsM.Cells(keepRow, c).Value = wsM.Cells(i, c).Value
                End If
                ' For invoice formats (col 9), merge pipe lists
                If c = 9 Then
                    Dim keepFmt As String, dupeFmt As String
                    keepFmt = Trim(CStr(wsM.Cells(keepRow, 9).Value & ""))
                    dupeFmt = Trim(CStr(wsM.Cells(i, 9).Value & ""))
                    If Len(dupeFmt) > 0 Then
                        Dim fmtParts() As String, fp As Long
                        fmtParts = Split(dupeFmt, "|")
                        For fp = LBound(fmtParts) To UBound(fmtParts)
                            If Not PatternInList(Trim(fmtParts(fp)), keepFmt) Then
                                If Len(keepFmt) = 0 Then
                                    keepFmt = Trim(fmtParts(fp))
                                Else
                                    keepFmt = keepFmt & "|" & Trim(fmtParts(fp))
                                End If
                            End If
                        Next fp
                        wsM.Cells(keepRow, 9).Value = keepFmt
                    End If
                End If
            Next c
            wsM.Rows(i).Delete
            dupes = dupes + 1
        End If
    Next i
    
    If dupes > 0 Then
        Application.StatusBar = "Removed " & dupes & " duplicate Master rows"
    End If
End Sub

' -----------------------------------------------------------
' Backup Master sheet data to array (for Cancel/undo)
' -----------------------------------------------------------
Private Function BackupMaster() As Variant
    Dim wsM As Worksheet: Set wsM = ThisWorkbook.Sheets("Master")
    Dim lr As Long: lr = wsM.Cells(wsM.Rows.Count, 1).End(xlUp).Row
    If lr < 2 Then
        BackupMaster = Empty
    Else
        BackupMaster = wsM.Range("A1:K" & lr).Value
    End If
End Function

' -----------------------------------------------------------
' Restore Master from backup array (Cancel/undo)
' -----------------------------------------------------------
Private Sub RestoreMaster(backup As Variant)
    If IsEmpty(backup) Then Exit Sub
    Dim wsM As Worksheet: Set wsM = ThisWorkbook.Sheets("Master")
    wsM.Cells.Clear
    wsM.Columns("A").NumberFormat = "@"
    Dim r As Long, c As Long
    For r = 1 To UBound(backup, 1)
        For c = 1 To UBound(backup, 2)
            wsM.Cells(r, c).Value = backup(r, c)
        Next c
    Next r
    wsM.Range("A1:K1").Font.Bold = True
End Sub

' -----------------------------------------------------------
' Backup ChangeLog row count (for Cancel/undo)
' -----------------------------------------------------------
Private Function BackupChangeLogCount() As Long
    Dim wsL As Worksheet: Set wsL = ThisWorkbook.Sheets("ChangeLog")
    BackupChangeLogCount = wsL.Cells(wsL.Rows.Count, 1).End(xlUp).Row
End Function

' -----------------------------------------------------------
' Restore ChangeLog by trimming rows added during run
' -----------------------------------------------------------
Private Sub RestoreChangeLog(originalRowCount As Long)
    Dim wsL As Worksheet: Set wsL = ThisWorkbook.Sheets("ChangeLog")
    Dim lr As Long: lr = wsL.Cells(wsL.Rows.Count, 1).End(xlUp).Row
    If lr > originalRowCount Then
        wsL.Rows(originalRowCount + 1 & ":" & lr).Delete
    End If
End Sub


' ============================================================
' BUILD MASTER FROM HISTORY (ONE TIME - remove after use)
' ============================================================
Sub BuildMasterFromHistory()
    Dim files As Variant
    Dim i As Long, r As Long, lr As Long
    Dim wb As Workbook, ws As Worksheet, wsM As Worksheet
    Dim vendorID As String, companyID As String, vendorName As String
    Dim payMethod As String, acct As String, dateOther As String
    Dim sepCheck As String, checksFor As String, invNum As String
    Dim invPattern As String
    Dim mRow As Long, newRow As Long
    Dim processedCount As Long, newCount As Long, updatedCount As Long
    Dim startRow As Long
    Dim dict As Object
    
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    Application.DisplayAlerts = False
    
    EnsureSheets
    Set wsM = ThisWorkbook.Sheets("Master")
    
    If VBA.MsgBox("This will scan up to 52 prior check run files to build the Master sheet." & vbCrLf & vbCrLf & _
              "Existing Master data will be kept and updated." & vbCrLf & _
              "This may take a few minutes. Continue?", _
              vbYesNo + vbQuestion, "Build Master") = vbNo Then
        GoTo BuildCleanup
    End If
    
    files = GetSortedFiles(52)
    
    Dim fileCount As Long
    On Error Resume Next: fileCount = UBound(files): On Error GoTo 0
    If fileCount = 0 Then VBA.MsgBox "No files found.", vbExclamation, "Error": GoTo BuildCleanup
    
    processedCount = 0: newCount = 0: updatedCount = 0
    
    ' Build dictionary for fast lookups
    Set dict = BuildMasterDict()
    
    ' Process OLDEST to NEWEST so most recent values win for D-H
    ' Patterns ACCUMULATE (all seen formats are kept)
    For i = fileCount To 1 Step -1
        On Error Resume Next
        Set wb = Workbooks.Open(files(i), ReadOnly:=True, UpdateLinks:=0)
        On Error GoTo 0
        If wb Is Nothing Then GoTo NextBuildFile
        
        Set ws = wb.Sheets(1)
        lr = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
        
        startRow = 1
        If LCase(Trim(ws.Cells(1, 1).Value & "")) = "vendor id" Then startRow = 2
        
        For r = startRow To lr
            vendorID = Trim(CStr(ws.Cells(r, 1).Value & ""))
            companyID = Trim(CStr(ws.Cells(r, 4).Value & ""))
            If vendorID = "" Or companyID = "" Then GoTo NextBuildRow
            If LCase(vendorID) = "vendor id" Then GoTo NextBuildRow
            
            vendorName = Trim(CStr(ws.Cells(r, 2).Value & ""))
            invNum = Trim(CStr(ws.Cells(r, 5).Value & ""))
            payMethod = Trim(CStr(ws.Cells(r, 17).Value & ""))
            acct = Trim(CStr(ws.Cells(r, 18).Value & ""))
            dateOther = Trim(CStr(ws.Cells(r, 19).Value & ""))
            sepCheck = Trim(CStr(ws.Cells(r, 20).Value & ""))
            checksFor = Trim(CStr(ws.Cells(r, 21).Value & ""))
            
            mRow = FindMasterRowDict(dict, vendorID, companyID)
            
            If mRow = 0 Then
                newRow = wsM.Cells(wsM.Rows.Count, 1).End(xlUp).Row + 1
                wsM.Cells(newRow, 1).Value = vendorID
                wsM.Cells(newRow, 2).Value = companyID
                wsM.Cells(newRow, 3).Value = vendorName
                If Len(payMethod) > 0 Then wsM.Cells(newRow, 4).Value = payMethod
                If Len(acct) > 0 Then wsM.Cells(newRow, 5).Value = acct
                If Len(dateOther) > 0 Then wsM.Cells(newRow, 6).Value = dateOther
                If Len(sepCheck) > 0 Then wsM.Cells(newRow, 7).Value = sepCheck
                If Len(checksFor) > 0 Then wsM.Cells(newRow, 8).Value = checksFor
                wsM.Cells(newRow, 9).Value = ""
                wsM.Cells(newRow, 10).Value = ""
                If Len(invNum) > 0 Then
                    invPattern = ClassifyInvoice(invNum)
                    If Len(invPattern) > 0 Then AddPatternToMaster newRow, invPattern, invNum
                End If
                wsM.Cells(newRow, 11).Value = Now
                ' Add to dict for future lookups in this run
                dict.Add Trim(vendorID) & "|" & Trim(companyID), newRow
                newCount = newCount + 1
            Else
                If Len(vendorName) > 0 Then wsM.Cells(mRow, 3).Value = vendorName
                If Len(payMethod) > 0 Then wsM.Cells(mRow, 4).Value = payMethod
                If Len(acct) > 0 Then wsM.Cells(mRow, 5).Value = acct
                If Len(dateOther) > 0 Then wsM.Cells(mRow, 6).Value = dateOther
                If Len(sepCheck) > 0 Then wsM.Cells(mRow, 7).Value = sepCheck
                If Len(checksFor) > 0 Then wsM.Cells(mRow, 8).Value = checksFor
                If Len(invNum) > 0 Then
                    invPattern = ClassifyInvoice(invNum)
                    If Len(invPattern) > 0 Then AddPatternToMaster mRow, invPattern, invNum
                End If
                wsM.Cells(mRow, 11).Value = Now
                updatedCount = updatedCount + 1
            End If
NextBuildRow:
        Next r
        
        processedCount = processedCount + 1
        wb.Close SaveChanges:=False: Set wb = Nothing
        Application.StatusBar = "Building Master... " & processedCount & " of " & fileCount & " files"
NextBuildFile:
        If Not wb Is Nothing Then wb.Close SaveChanges:=False: Set wb = Nothing
    Next i
    
    ' Dedup Master
    DedupMaster
    
    ' Sort Master
    lr = wsM.Cells(wsM.Rows.Count, 1).End(xlUp).Row
    If lr > 1 Then
        With wsM.Sort
            .SortFields.Clear
            .SortFields.Add2 Key:=wsM.Range("A2:A" & lr), Order:=xlAscending
            .SortFields.Add2 Key:=wsM.Range("B2:B" & lr), Order:=xlAscending
            .SetRange wsM.Range("A1:K" & lr)
            .Header = xlYes
            .Apply
        End With
    End If
    wsM.Columns("A:K").AutoFit
    
    ' Auto-save master workbook
    ThisWorkbook.Save
    
BuildCleanup:
    Application.StatusBar = False
    Application.DisplayAlerts = True
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    
    If processedCount > 0 Then
        VBA.MsgBox "Master Build Complete!" & vbCrLf & vbCrLf & _
               "Files processed: " & processedCount & vbCrLf & _
               "New vendor/company combos: " & newCount & vbCrLf & _
               "Existing combos updated: " & updatedCount & vbCrLf & _
               "Total Master rows: " & (wsM.Cells(wsM.Rows.Count, 1).End(xlUp).Row - 1), _
               vbInformation, "Build Complete"
    End If
End Sub


' ============================================================
' WEEKLY RUN: Transform + Validate + Fill from Master
' ============================================================
Sub RunWeeklyCheckRun()
    Dim rawFile As Variant
    Dim wbRaw As Workbook, wsRaw As Worksheet
    Dim wsOut As Worksheet, wsM As Worksheet
    Dim lastRow As Long, outRow As Long
    Dim curVendorID As String, curVendorName As String
    Dim i As Long, mRow As Long
    Dim v As String
    Dim newVendors As Long, filled As Long, issues As Long, missingData As Long
    Dim resp As Long
    Dim dict As Object
    
    ' For cancel/undo
    Dim masterBackup As Variant
    Dim logCountBefore As Long
    Dim cancelled As Boolean: cancelled = False
    
    ' For ask-once-per-vendor
    ' Stores decisions: key = VendorID|CompanyID
    ' Value = "ACCEPT|Pay|Acct|For" or "REJECT" or "FILLED|Pay|Acct|For"
    Dim vendorDecisions As Object
    Set vendorDecisions = CreateObject("Scripting.Dictionary")
    vendorDecisions.CompareMode = vbTextCompare
    
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    Application.DisplayAlerts = False
    
    EnsureSheets
    Set wsM = ThisWorkbook.Sheets("Master")
    
    ' Backup Master + ChangeLog before any changes
    masterBackup = BackupMaster()
    logCountBefore = BackupChangeLogCount()
    
    ' Build dictionary for fast lookups
    Set dict = BuildMasterDict()
    
    ' --- Step 1: Pick raw file ---
    rawFile = Application.GetOpenFilename( _
        FileFilter:="Excel Files (*.xls;*.xlsx;*.xlsm),*.xls;*.xlsx;*.xlsm", _
        Title:="Select This Week's Raw Check Run File")
    If rawFile = False Then GoTo WeeklyCleanup
    
    Set wbRaw = Workbooks.Open(CStr(rawFile), ReadOnly:=False, UpdateLinks:=0)
    Set wsRaw = wbRaw.Sheets(1)
    lastRow = wsRaw.Cells(wsRaw.Rows.Count, 1).End(xlUp).Row
    
    ' --- Step 2: Flatten to CurrentWeek ---
    Set wsOut = ThisWorkbook.Sheets("CurrentWeek")
    wsOut.Cells.Clear
    wsOut.Columns("A").NumberFormat = "@"
    wsOut.Columns("C").NumberFormat = "@"
    wsOut.Columns("E").NumberFormat = "@"
    
    Dim cwHeaders As Variant
    cwHeaders = Array("Vendor ID", "Vendor Name", "Ref Nbr", "Company ID", _
                      "Invoice Number", "due Date", "Invoice Date", "DocType", _
                      "Master DocType", "Master Doc Ref Nbr", "Entered", "Posted", _
                      "Closed", "Doc Amount", "Doc Balance", "Comments", _
                      "PAYMENT METHOD", "ACCOUNT", "DATE (OTHER THAN CURRENT)", _
                      "Separate check", "Checks are for:")
    Dim hIdx As Long
    For hIdx = 0 To UBound(cwHeaders)
        wsOut.Cells(1, hIdx + 1).Value = cwHeaders(hIdx)
    Next hIdx
    wsOut.Range("A1:U1").Font.Bold = True
    
    outRow = 2
    curVendorID = "": curVendorName = ""
    
    For i = 1 To lastRow
        v = Trim(CStr(wsRaw.Cells(i, 1).Value & ""))
        
        If v = "Account" Or v = "Company:" Or v = "Company: " Then GoTo NextFlatRow
        If Left(v, 12) = "Vendor Total" Then GoTo NextFlatRow
        If Left(v, 13) = "Company Total" Then GoTo NextFlatRow
        If Left(v, 2) = "**" Then GoTo NextFlatRow
        
        If v = "17000" Then
            curVendorID = Trim(CStr(wsRaw.Cells(i, 3).Value & ""))
            curVendorName = Trim(CStr(wsRaw.Cells(i, 4).Value & ""))
            GoTo NextFlatRow
        End If
        
        If v = "" Then
            Dim refNbr As String
            refNbr = Trim(CStr(wsRaw.Cells(i, 2).Value & ""))
            If Len(refNbr) > 0 And IsNumeric(refNbr) Then
                Dim docType As String
                docType = Trim(CStr(wsRaw.Cells(i, 7).Value & ""))
                ' Only keep rows with DocType AD or VO
                If docType <> "AD" And docType <> "VO" Then GoTo NextFlatRow
                
                wsOut.Cells(outRow, 1).Value = curVendorID
                wsOut.Cells(outRow, 2).Value = curVendorName
                wsOut.Cells(outRow, 3).Value = Trim(CStr(wsRaw.Cells(i, 2).Value & ""))
                wsOut.Cells(outRow, 4).Value = wsRaw.Cells(i, 3).Value
                wsOut.Cells(outRow, 5).Value = Trim(CStr(wsRaw.Cells(i, 4).Value & ""))
                wsOut.Cells(outRow, 6).Value = wsRaw.Cells(i, 5).Value
                wsOut.Cells(outRow, 7).Value = wsRaw.Cells(i, 6).Value
                wsOut.Cells(outRow, 8).Value = docType
                wsOut.Cells(outRow, 9).Value = wsRaw.Cells(i, 8).Value
                wsOut.Cells(outRow, 10).Value = wsRaw.Cells(i, 9).Value
                wsOut.Cells(outRow, 11).Value = wsRaw.Cells(i, 10).Value
                wsOut.Cells(outRow, 12).Value = wsRaw.Cells(i, 11).Value
                wsOut.Cells(outRow, 14).Value = wsRaw.Cells(i, 13).Value
                wsOut.Cells(outRow, 15).Value = wsRaw.Cells(i, 14).Value
                outRow = outRow + 1
            End If
        End If
NextFlatRow:
    Next i
    
    Set wsRaw = Nothing
    
    ' Sort by Vendor Name
    If outRow > 2 Then
        Dim rng As Range: Set rng = wsOut.Range("A1:U" & outRow - 1)
        With wsOut.Sort
            .SortFields.Clear
            .SortFields.Add2 Key:=wsOut.Range("B2:B" & outRow - 1), Order:=xlAscending
            .SetRange rng
            .Header = xlYes
            .Apply
        End With
    End If
    
    ' --- Step 3: Validate + Fill from Master ---
    Application.ScreenUpdating = True
    newVendors = 0: filled = 0: issues = 0: missingData = 0
    
    Dim vendorID As String, companyID As String, vendorName As String
    Dim invNum As String, invPattern As String
    Dim masterFormats As String, masterExamples As String
    Dim dueDate As Date, daysDiff As Long
    Dim vKey As String
    Dim decParts() As String
    
    For i = 2 To outRow - 1
        vendorID = Trim(CStr(wsOut.Cells(i, 1).Value & ""))
        companyID = Trim(CStr(wsOut.Cells(i, 4).Value & ""))
        vendorName = Trim(CStr(wsOut.Cells(i, 2).Value & ""))
        invNum = Trim(CStr(wsOut.Cells(i, 5).Value & ""))
        vKey = vendorID & "|" & companyID
        
        mRow = FindMasterRowDict(dict, vendorID, companyID)
        
        If mRow = 0 Then
            ' ==========================================
            ' NEW VENDOR/COMPANY
            ' ==========================================
            
            ' Check if we already asked about this vendor+company this run
            If vendorDecisions.exists(vKey) Then
                Dim priorDecision As String
                priorDecision = vendorDecisions(vKey)
                If Left(priorDecision, 6) = "REJECT" Then
                    wsOut.Range("A" & i & ":U" & i).Interior.Color = RGB(255, 200, 200)
                    issues = issues + 1
                    GoTo NextValidRow
                ElseIf Left(priorDecision, 6) = "ACCEPT" Then
                    ' Use same answers from first prompt
                    decParts = Split(priorDecision, "|")
                    ' decParts: 0=ACCEPT, 1=Pay, 2=Acct, 3=For
                    wsOut.Cells(i, 17).Value = decParts(1)
                    wsOut.Cells(i, 18).Value = decParts(2)
                    wsOut.Cells(i, 21).Value = decParts(3)
                    filled = filled + 1
                    ' mRow should now exist from first time
                    mRow = FindMasterRowDict(dict, vendorID, companyID)
                    If mRow > 0 Then GoTo CheckInvoiceFormat
                    GoTo NextValidRow
                End If
            End If
            
            newVendors = newVendors + 1
            
            resp = VBA.MsgBox("NEW vendor/company combo:" & vbCrLf & vbCrLf & _
                "Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                "Company: " & companyID & vbCrLf & _
                "Invoice: " & CStr(invNum) & vbCrLf & _
                "Amount: " & Format(wsOut.Cells(i, 14).Value, "$#,##0.00") & vbCrLf & vbCrLf & _
                "YES = Enter payment details and add to Master" & vbCrLf & _
                "NO = Reject (highlight row red, skip)" & vbCrLf & _
                "CANCEL = Abort entire run (undo all changes)", _
                vbYesNoCancel + vbQuestion, _
                "New Vendor Found")
            
            If resp = vbCancel Then
                cancelled = True
                GoTo CancelRun
            ElseIf resp = vbNo Then
                wsOut.Range("A" & i & ":U" & i).Interior.Color = RGB(255, 200, 200)
                LogChange vendorID, companyID, vendorName, "NEW VENDOR", "", _
                          "SKIPPED by user", "User Rejected"
                issues = issues + 1
                vendorDecisions.Add vKey, "REJECT"
                GoTo NextValidRow
            End If
            
            ' User said Yes
            Dim newPay As String, newAcct As String, newFor As String
            newPay = InputBox("Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                "Company: " & companyID & vbCrLf & vbCrLf & _
                "Enter PAYMENT METHOD:" & vbCrLf & _
                "(Check, CITI, Amex, fake check, Chase Sapphire)", _
                "New Vendor - Payment Method", "Check")
            If Len(newPay) = 0 Then newPay = "Check"
            
            newAcct = InputBox("Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                "Company: " & companyID & vbCrLf & vbCrLf & _
                "Enter ACCOUNT:" & vbCrLf & _
                "(e.g. WARE, BB, FC, ES, 139, SR)", _
                "New Vendor - Account", companyID)
            If Len(newAcct) = 0 Then newAcct = companyID
            
            newFor = InputBox("Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                "Company: " & companyID & vbCrLf & vbCrLf & _
                "CHECKS ARE FOR:" & vbCrLf & _
                "(e.g. Mordy, Sarah)", _
                "New Vendor - Checks Are For", "Mordy")
            If Len(newFor) = 0 Then newFor = "Mordy"
            
            ' Remember decision for this vendor+company
            vendorDecisions.Add vKey, "ACCEPT|" & newPay & "|" & newAcct & "|" & newFor
            
            ' Add to Master
            Dim newMRow As Long
            newMRow = wsM.Cells(wsM.Rows.Count, 1).End(xlUp).Row + 1
            wsM.Cells(newMRow, 1).Value = vendorID
            wsM.Cells(newMRow, 2).Value = companyID
            wsM.Cells(newMRow, 3).Value = vendorName
            wsM.Cells(newMRow, 4).Value = newPay
            wsM.Cells(newMRow, 5).Value = newAcct
            wsM.Cells(newMRow, 6).Value = ""
            wsM.Cells(newMRow, 7).Value = ""
            wsM.Cells(newMRow, 8).Value = newFor
            wsM.Cells(newMRow, 9).Value = ""
            wsM.Cells(newMRow, 10).Value = ""
            If Len(invNum) > 0 Then
                invPattern = ClassifyInvoice(invNum)
                If Len(invPattern) > 0 Then AddPatternToMaster newMRow, invPattern, invNum
            End If
            wsM.Cells(newMRow, 11).Value = Now
            
            ' Add to dict for future lookups this run
            dict(vKey) = newMRow
            
            LogChange vendorID, companyID, vendorName, "NEW VENDOR", "", _
                      "Pay=" & newPay & ", Acct=" & newAcct & ", For=" & newFor, "Auto-Added"
            
            wsOut.Cells(i, 17).Value = newPay
            wsOut.Cells(i, 18).Value = newAcct
            wsOut.Cells(i, 21).Value = newFor
            filled = filled + 1
            
        Else
            ' ==========================================
            ' KNOWN VENDOR/COMPANY - fill from Master
            ' ==========================================
            wsOut.Cells(i, 17).Value = wsM.Cells(mRow, 4).Value
            wsOut.Cells(i, 18).Value = wsM.Cells(mRow, 5).Value
            wsOut.Cells(i, 19).Value = wsM.Cells(mRow, 6).Value
            wsOut.Cells(i, 20).Value = wsM.Cells(mRow, 7).Value
            wsOut.Cells(i, 21).Value = wsM.Cells(mRow, 8).Value
            filled = filled + 1
            
            ' ----- CHECK: Missing Q, R, or U -----
            Dim missingPay As Boolean, missingAcct As Boolean, missingFor As Boolean
            missingPay = (Len(Trim(CStr(wsM.Cells(mRow, 4).Value & ""))) = 0)
            missingAcct = (Len(Trim(CStr(wsM.Cells(mRow, 5).Value & ""))) = 0)
            missingFor = (Len(Trim(CStr(wsM.Cells(mRow, 8).Value & ""))) = 0)
            
            If missingPay Or missingAcct Or missingFor Then
                ' Check if already answered this run
                If vendorDecisions.exists(vKey & "_FILL") Then
                    Dim fillDecision As String
                    fillDecision = vendorDecisions(vKey & "_FILL")
                    If fillDecision = "SKIP" Then
                        wsOut.Range("A" & i & ":U" & i).Interior.Color = RGB(255, 255, 200)
                        issues = issues + 1
                        GoTo CheckInvoiceFormat
                    ElseIf Left(fillDecision, 4) = "FILL" Then
                        decParts = Split(fillDecision, "|")
                        If missingPay And Len(decParts(1)) > 0 Then wsOut.Cells(i, 17).Value = decParts(1)
                        If missingAcct And Len(decParts(2)) > 0 Then wsOut.Cells(i, 18).Value = decParts(2)
                        If missingFor And Len(decParts(3)) > 0 Then wsOut.Cells(i, 21).Value = decParts(3)
                        GoTo CheckInvoiceFormat
                    End If
                End If
                
                missingData = missingData + 1
                
                resp = VBA.MsgBox("KNOWN vendor with MISSING data:" & vbCrLf & vbCrLf & _
                    "Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                    "Company: " & companyID & vbCrLf & _
                    "Invoice: " & CStr(invNum) & vbCrLf & _
                    "Amount: " & Format(wsOut.Cells(i, 14).Value, "$#,##0.00") & vbCrLf & vbCrLf & _
                    "Missing: " & IIf(missingPay, "Payment Method  ", "") & _
                    IIf(missingAcct, "Account  ", "") & _
                    IIf(missingFor, "Checks Are For", "") & vbCrLf & vbCrLf & _
                    "YES = Enter missing details" & vbCrLf & _
                    "NO = Skip (highlight row yellow)" & vbCrLf & _
                    "CANCEL = Abort entire run (undo all changes)", _
                    vbYesNoCancel + vbQuestion, _
                    "Missing Vendor Data")
                
                If resp = vbCancel Then
                    cancelled = True
                    GoTo CancelRun
                ElseIf resp = vbNo Then
                    wsOut.Range("A" & i & ":U" & i).Interior.Color = RGB(255, 255, 200)
                    issues = issues + 1
                    vendorDecisions.Add vKey & "_FILL", "SKIP"
                ElseIf resp = vbYes Then
                    Dim fillPay As String, fillAcct As String, fillFor As String
                    fillPay = "": fillAcct = "": fillFor = ""
                    
                    If missingPay Then
                        fillPay = InputBox("Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                            "Company: " & companyID & vbCrLf & vbCrLf & _
                            "Enter PAYMENT METHOD:" & vbCrLf & _
                            "(Check, CITI, Amex, fake check, Chase Sapphire)", _
                            "Missing - Payment Method", "Check")
                        If Len(fillPay) = 0 Then fillPay = "Check"
                        wsOut.Cells(i, 17).Value = fillPay
                        wsM.Cells(mRow, 4).Value = fillPay
                        LogChange vendorID, companyID, vendorName, "PaymentMethod", "", fillPay, "User Confirmed"
                    End If
                    
                    If missingAcct Then
                        fillAcct = InputBox("Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                            "Company: " & companyID & vbCrLf & vbCrLf & _
                            "Enter ACCOUNT:" & vbCrLf & _
                            "(e.g. WARE, BB, FC, ES, 139, SR)", _
                            "Missing - Account", companyID)
                        If Len(fillAcct) = 0 Then fillAcct = companyID
                        wsOut.Cells(i, 18).Value = fillAcct
                        wsM.Cells(mRow, 5).Value = fillAcct
                        LogChange vendorID, companyID, vendorName, "Account", "", fillAcct, "User Confirmed"
                    End If
                    
                    If missingFor Then
                        fillFor = InputBox("Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                            "Company: " & companyID & vbCrLf & vbCrLf & _
                            "CHECKS ARE FOR:" & vbCrLf & _
                            "(e.g. Mordy, Sarah)", _
                            "Missing - Checks Are For", "Mordy")
                        If Len(fillFor) = 0 Then fillFor = "Mordy"
                        wsOut.Cells(i, 21).Value = fillFor
                        wsM.Cells(mRow, 8).Value = fillFor
                        LogChange vendorID, companyID, vendorName, "ChecksAreFor", "", fillFor, "User Confirmed"
                    End If
                    
                    wsM.Cells(mRow, 11).Value = Now
                    vendorDecisions.Add vKey & "_FILL", "FILL|" & fillPay & "|" & fillAcct & "|" & fillFor
                End If
            End If
            
CheckInvoiceFormat:
            ' ----- CHECK: Invoice format -----
            If Len(invNum) > 0 Then
                invPattern = ClassifyInvoice(invNum)
                masterFormats = Trim(CStr(wsM.Cells(mRow, 9).Value & ""))
                
                If Len(masterFormats) > 0 And Len(invPattern) > 0 Then
                    If Not PatternInList(invPattern, masterFormats) Then
                        issues = issues + 1
                        masterExamples = Trim(CStr(wsM.Cells(mRow, 10).Value & ""))
                        
                        resp = VBA.MsgBox("NEW INVOICE FORMAT detected:" & vbCrLf & vbCrLf & _
                            "Vendor: " & vendorID & " - " & vendorName & vbCrLf & _
                            "Company: " & companyID & vbCrLf & vbCrLf & _
                            "Known formats: " & CStr(masterFormats) & vbCrLf & _
                            "Known examples: " & CStr(masterExamples) & vbCrLf & vbCrLf & _
                            "Current invoice: " & CStr(invNum) & vbCrLf & _
                            "Current format:  " & CStr(invPattern) & vbCrLf & vbCrLf & _
                            "YES = Add format to allowed list" & vbCrLf & _
                            "NO = Reject (highlight yellow)" & vbCrLf & _
                            "CANCEL = Abort entire run (undo all changes)", _
                            vbYesNoCancel + vbQuestion, _
                            "New Invoice Format")
                        
                        If resp = vbCancel Then
                            cancelled = True
                            GoTo CancelRun
                        ElseIf resp = vbYes Then
                            AddPatternToMaster mRow, invPattern, invNum
                            LogChange vendorID, companyID, vendorName, "InvoiceFormat-Added", _
                                      CStr(masterFormats), _
                                      CStr(masterFormats) & "|" & CStr(invPattern), "User Confirmed"
                            wsM.Cells(mRow, 11).Value = Now
                        Else
                            LogChange vendorID, companyID, vendorName, "InvoiceFormat-Rejected", _
                                      CStr(masterFormats), CStr(invPattern) & " (" & CStr(invNum) & ")", "User Rejected"
                            wsOut.Cells(i, 5).Interior.Color = RGB(255, 255, 0)
                        End If
                    End If
                ElseIf Len(masterFormats) = 0 And Len(invPattern) > 0 Then
                    AddPatternToMaster mRow, invPattern, invNum
                End If
            End If
        End If
        
        ' ----- CHECK: Due date - HIGHLIGHT ONLY -----
        If IsDate(wsOut.Cells(i, 6).Value) Then
            dueDate = CDate(wsOut.Cells(i, 6).Value)
            daysDiff = DateDiff("d", Date, dueDate)
            
            If daysDiff > 60 Or daysDiff < -180 Then
                issues = issues + 1
                wsOut.Cells(i, 6).Interior.Color = RGB(255, 100, 100)
                On Error Resume Next
                wsOut.Cells(i, 6).AddComment IIf(daysDiff > 60, _
                    "Due date is " & daysDiff & " days in the future", _
                    "Due date is " & Abs(daysDiff) & " days in the past")
                On Error GoTo 0
            End If
        End If
        
NextValidRow:
        Application.StatusBar = "Processing row " & i & " of " & (outRow - 1) & "..."
    Next i
    
    ' --- Step 4: Format ---
    wsOut.Range("E1:E" & outRow - 1).HorizontalAlignment = xlHAlignRight
    wsOut.Columns("F:G").NumberFormat = "m/d/yyyy"
    wsOut.Columns("K:L").NumberFormat = "MM/YY"
    wsOut.Columns("N:O").NumberFormat = "$#,##0.00"
    wsOut.Range("A1:U1").WrapText = True
    wsOut.Range("A1:U1").VerticalAlignment = xlVAlignBottom
    wsOut.Columns("A:U").AutoFit
    
    Dim col As Long, hdr As String, words() As String, w As Long, longestWord As Long
    For col = 1 To 21
        If wsOut.Columns(col).ColumnWidth > 22 Then wsOut.Columns(col).ColumnWidth = 22
        hdr = wsOut.Cells(1, col).Value & ""
        words = Split(hdr, " ")
        longestWord = 0
        For w = LBound(words) To UBound(words)
            If Len(words(w)) > longestWord Then longestWord = Len(words(w))
        Next w
        If wsOut.Columns(col).ColumnWidth < longestWord + 2 Then
            wsOut.Columns(col).ColumnWidth = longestWord + 2
        End If
    Next col
    
    ' --- Step 5: Copy flat sheet into the ORIGINAL raw file ---
    If Not wbRaw Is Nothing And outRow > 2 Then
        Dim wsExisting As Worksheet
        On Error Resume Next
        Set wsExisting = wbRaw.Sheets("CheckRun_Flat")
        On Error GoTo 0
        If Not wsExisting Is Nothing Then
            Application.DisplayAlerts = False
            wsExisting.Delete
            Application.DisplayAlerts = True
        End If
        
        wsOut.Copy After:=wbRaw.Sheets(wbRaw.Sheets.Count)
        wbRaw.Sheets(wbRaw.Sheets.Count).Name = "CheckRun_Flat"
        wbRaw.Save
        wbRaw.Close SaveChanges:=False
        Set wbRaw = Nothing
    End If
    
    ' --- Step 6: Auto-save master workbook ---
    ThisWorkbook.Save
    
    GoTo WeeklyCleanup

CancelRun:
    ' Undo all Master and ChangeLog changes
    RestoreMaster masterBackup
    RestoreChangeLog logCountBefore
    wsOut.Cells.Clear
    VBA.MsgBox "Run cancelled. All changes have been undone.", vbExclamation, "Cancelled"

WeeklyCleanup:
    If Not wbRaw Is Nothing Then wbRaw.Close SaveChanges:=False
    Application.StatusBar = False
    Application.DisplayAlerts = True
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    
    If outRow > 2 And Not cancelled Then
        wsOut.Activate
        VBA.MsgBox "Weekly Check Run Complete!" & vbCrLf & vbCrLf & _
               "Invoice rows: " & (outRow - 2) & vbCrLf & _
               "Filled from Master: " & filled & vbCrLf & _
               "New vendors added: " & newVendors & vbCrLf & _
               "Missing data prompted: " & missingData & vbCrLf & _
               "Issues flagged: " & issues & vbCrLf & vbCrLf & _
               "Red cells = suspicious due dates" & vbCrLf & _
               "Light red rows = rejected new vendors" & vbCrLf & _
               "Yellow cells = rejected invoice formats" & vbCrLf & _
               "Light yellow rows = skipped missing data", _
               vbInformation, "Complete"
    End If
End Sub
