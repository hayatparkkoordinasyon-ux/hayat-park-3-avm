$path = Join-Path $PSScriptRoot 'en\gallery.html'
$lines = [IO.File]::ReadAllLines($path)
'TITLE: ' + $lines[10]
'GALLERY LINK LINE: ' + $lines[174]
$dash = [regex]::Match($lines[10], '<title>Gallery(.{1,3})Hayat').Groups[1].Value
'DASH_CHARS: ' + (($dash.ToCharArray() | ForEach-Object { 'U+' + '{0:X4}' -f [int]$_ }) -join ' ')
$mid = [regex]::Match($lines[174], 'Galeri(.{1,3})Gallery').Groups[1].Value
'MIDDOT_CHARS: ' + (($mid.ToCharArray() | ForEach-Object { 'U+' + '{0:X4}' -f [int]$_ }) -join ' ')
