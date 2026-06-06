# protect-sources.ps1
# Flags bulk staged changes to docs/sources/source_*.md before commit.
# Run manually or invoke from .git/hooks/pre-commit.
#
# Usage: pwsh -File tools/protect-sources.ps1 [--threshold N]
#   --threshold N  number of source files changed before blocking (default: 5)

param(
    [int]$Threshold = 5
)

$staged = git diff --cached --name-only 2>$null | Where-Object { $_ -match '^docs/sources/source_\d+\.md$' }
$count = ($staged | Measure-Object).Count

if ($count -eq 0) { exit 0 }

if ($count -ge $Threshold) {
    Write-Host ""
    Write-Host "BLOCKED: $count source files staged for commit." -ForegroundColor Red
    Write-Host ""
    Write-Host "docs/sources/source_*.md files are research assets." -ForegroundColor Yellow
    Write-Host "Bulk rewrites have caused data loss before." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Staged files:" -ForegroundColor Cyan
    $staged | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
    Write-Host "To proceed anyway: git commit --no-verify" -ForegroundColor DarkGray
    Write-Host "To review diff:    git diff --cached docs/sources/" -ForegroundColor DarkGray
    Write-Host ""
    exit 1
}

if ($count -gt 1) {
    Write-Host "WARNING: $count source files staged. Verify this is intentional." -ForegroundColor Yellow
    $staged | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
}

exit 0
