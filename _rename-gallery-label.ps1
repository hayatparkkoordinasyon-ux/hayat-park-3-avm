$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$utf8 = New-Object System.Text.UTF8Encoding $false

Get-ChildItem -Path $root -Recurse -Include '*.html','*.js' | ForEach-Object {
  if ($_.FullName -match '\\node_modules\\') { return }
  $p = $_.FullName
  $t = [IO.File]::ReadAllText($p)
  $n = $t.Replace('Galeri · Gallery', 'Galeri · Project Photos')
  if ($n -ne $t) { [IO.File]::WriteAllText($p, $n, $utf8) }
}

$enDir = Join-Path $root 'en'
Get-ChildItem -Path $enDir -Filter '*.html' | ForEach-Object {
  $p = $_.FullName
  $t = [IO.File]::ReadAllText($p)
  $n = $t `
    -replace 'href="gallery.html">Gallery</a>', 'href="gallery.html">Project Photos</a>' `
    -replace 'Gallery — Hayat Park 3 AVM', 'Project Photos — Hayat Park 3 AVM' `
    -replace '<li class="breadcrumb-item active" aria-current="page">Gallery</li>', '<li class="breadcrumb-item active" aria-current="page">Project Photos</li>' `
    -replace 'Transparency gallery', 'Transparency: project photos' `
    -replace 'aria-label="Gallery categories"', 'aria-label="Project photo categories"' `
    -replace 'View meeting gallery', 'View meeting photos' `
    -replace 'Open interactive gallery', 'Open interactive project photos' `
    -replace 'Maintain a chronological gallery of visuals', 'Maintain chronological project visuals' `
    -replace 'Responsive gallery rollout', 'Responsive project-photo rollout' `
    -replace '<meta name="description" content="Responsive gallery with filtering', '<meta name="description" content="Responsive project-photo browser with filtering' `
    -replace '<meta property="og:description" content="Interactive gallery spanning', '<meta property="og:description" content="Interactive project photos spanning'

  if ($n -ne $t) { [IO.File]::WriteAllText($p, $n, $utf8) }
}
