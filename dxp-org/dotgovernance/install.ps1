# install.ps1
# Copy Governance Commons starter or template files into a target project.

param(
    [string]$TargetPath = ".",

    [ValidateSet("starter", "template")]
    [string]$Mode = "starter",

    [switch]$Force,
    [switch]$Help
)

if ($Help) {
    Write-Host ""
    Write-Host "  Governance Commons installer" -ForegroundColor White
    Write-Host ""
    Write-Host "  USAGE" -ForegroundColor Cyan
    Write-Host "    .\install.ps1"
    Write-Host "    .\install.ps1 -TargetPath C:\work\my-project"
    Write-Host "    .\install.ps1 -Mode template"
    Write-Host "    .\install.ps1 -Force"
    Write-Host ""
    Write-Host "  MODES" -ForegroundColor Cyan
    Write-Host "    starter   Blank structure for an existing project"
    Write-Host "    template  Pre-filled examples to edit down"
    Write-Host ""
    exit 0
}

$sourceRoot = Join-Path $PSScriptRoot $Mode
if (-not (Test-Path $sourceRoot)) {
    throw "Missing source folder: $sourceRoot"
}

$targetRoot = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($TargetPath)
if (-not (Test-Path $targetRoot)) {
    New-Item -ItemType Directory -Path $targetRoot -Force | Out-Null
}

Write-Host ""
Write-Host "  Governance Commons install" -ForegroundColor White
Write-Host "  mode:   $Mode" -ForegroundColor DarkGray
Write-Host "  target: $targetRoot" -ForegroundColor DarkGray
Write-Host ""

Get-ChildItem -Path $sourceRoot -Force | ForEach-Object {
    $target = Join-Path $targetRoot $_.Name

    if ((Test-Path $target) -and -not $Force) {
        Write-Host "  exists  $($_.Name)" -ForegroundColor DarkGray
        return
    }

    Copy-Item -Path $_.FullName -Destination $target -Recurse -Force:$Force
    Write-Host "  copied  $($_.Name)" -ForegroundColor Green
}

Write-Host ""
Write-Host "  Next:" -ForegroundColor Cyan
Write-Host "    1. Edit .governance\context.md"
Write-Host "    2. Edit .governance\agents.md"
Write-Host "    3. Start your AI coding agent and point it at AGENTS.md"
Write-Host ""
