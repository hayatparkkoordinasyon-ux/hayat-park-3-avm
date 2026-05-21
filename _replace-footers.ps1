$root      = Split-Path -Parent $MyInvocation.MyCommand.Path
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

Get-ChildItem -Path $root -Recurse -Filter *.html | ForEach-Object {
  $p = $_.FullName
  $t = [System.IO.File]::ReadAllText($p)
  if ($t -match 'hp3-footer-mount') {
    Write-Host ("skip mounted: $p")
    return
  }
  if ($t -notmatch '(?is)<footer') {
    Write-Warning "no footer tag: $p"
    return
  }
  $pfx = '..'
  if ($_.DirectoryName.TrimEnd('\') -eq $root.TrimEnd('\')) {
    $pfx = '.'
  }
  $nl = [Environment]::NewLine
  $rep = "    <footer id=`"hp3-footer-mount`" class=`"hp3-footer hp3-footer-mega mt-auto pt-5 pb-4`" role=`"contentinfo`"></footer>${nl}    <script src=`"$pfx/assets/js/site-footer.js`"></script>${nl}${nl}"
  $n = [regex]::Replace($t, '(?is)<footer\b[^>]*>.*?</footer>\s*', $rep, 1)
  [System.IO.File]::WriteAllText($p, $n, $utf8NoBom)
}

Write-Host Done.
