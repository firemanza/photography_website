param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Arguments
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$searchScript = Join-Path $repoRoot ".codex\skills\ui-ux-pro-max\scripts\search.py"
$skillScriptsDir = Split-Path -Parent $searchScript

$pythonCandidates = @(
    (Join-Path $repoRoot ".venv\Scripts\python.exe"),
    "C:\Program Files\PostgreSQL\18\pgAdmin 4\python\python.exe"
)

$python = $pythonCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $python) {
    Write-Error "No usable Python runtime found. Install Python or create .venv\Scripts\python.exe."
    exit 1
}

if (-not (Test-Path $searchScript)) {
    Write-Error "UI Pro Max search script not found at $searchScript"
    exit 1
}

if (-not $Arguments -or $Arguments.Count -eq 0) {
    Write-Host "Usage: .\ui-ux-pro-max.ps1 <query> [--design-system] [other search.py flags]"
    exit 0
}

$pythonCode = @"
import runpy
import sys

sys.path.insert(0, r'$skillScriptsDir')
sys.argv = [r'$searchScript'] + sys.argv[1:]
runpy.run_path(r'$searchScript', run_name='__main__')
"@

& $python -c $pythonCode @Arguments
exit $LASTEXITCODE
