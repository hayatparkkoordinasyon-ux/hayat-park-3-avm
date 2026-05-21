$root = 'C:\Users\eyuce\IdeaProjects\hayat-park-3-avm'
$em = [char]0x2014
$mid = [char]0x00B7
$utf8 = New-Object System.Text.UTF8Encoding $false

$footerOld = 'Galeri ' + $mid + ' Gallery'
$footerNew = 'Galeri ' + $mid + ' Project Photos'
$titleOld = '<title>Gallery ' + $em + ' Hayat Park 3 AVM</title>'
$titleNew = '<title>Project Photos ' + $em + ' Hayat Park 3 AVM</title>'

Get-ChildItem -LiteralPath $root -Recurse -File |
  Where-Object { $_.Extension -in '.html', '.js' } |
  ForEach-Object {
    $path = $_.FullName
    $t = [IO.File]::ReadAllText($path)
    $n = $t.Replace($footerOld, $footerNew).Replace($titleOld, $titleNew)
    if ($n -ne $t) { [IO.File]::WriteAllText($path, $n, $utf8) }
  }
