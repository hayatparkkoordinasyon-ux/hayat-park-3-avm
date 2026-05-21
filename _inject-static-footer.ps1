$root   = "C:\Users\eyuce\IdeaProjects\hayat-park-3-avm"
$footer = [System.IO.File]::ReadAllText([System.IO.Path]::Combine($root, "assets", "partials", "footer-static.html"))
$utf8   = New-Object System.Text.UTF8Encoding $false
$rx     = New-Object System.Text.RegularExpressions.Regex(
  '(?is)\s*<footer id="hp3-footer-mount"[^>]*></footer>\s*<script src="(?:\./|\.\./)assets/js/site-footer\.js"></script>\s*',
  [System.Text.RegularExpressions.RegexOptions]::Compiled
)

Get-ChildItem -Path $root -Recurse -Filter "*.html" | ForEach-Object {
  $p = $_.FullName
  $t = [System.IO.File]::ReadAllText($p)
  if (-not $rx.IsMatch($t)) {
    Write-Host "skip (no mount): $p"
    return
  }
  $n = $rx.Replace($t, "`r`n" + $footer.TrimEnd() + "`r`n    ", 1)
  [System.IO.File]::WriteAllText($p, $n, $utf8)
}

Write-Host "Injected static footer into HTML files."
