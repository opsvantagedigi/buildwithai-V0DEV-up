$log = "pr-2-watch.log"
"Starting PR #2 watcher at $(Get-Date -Format o)" | Tee-Object -FilePath $log -Append
while ($true) {
  try {
    $r = gh pr view 2 --repo opsvantagedigi/buildwithai-V0DEV-up --json number,state,mergeable,mergeStateStatus,statusCheckRollup,url
    $obj = $r | ConvertFrom-Json
    $ts = Get-Date -Format o
    $line = "${ts} - state=$($obj.state) mergeState=$($obj.mergeStateStatus) mergeable=$($obj.mergeable)"
    $line | Tee-Object -FilePath $log -Append
    if ($obj.mergeStateStatus -eq 'MERGEABLE' -or $obj.state -eq 'MERGED') {
      "PR ready: $($obj.url) $line" | Tee-Object -FilePath $log -Append
      exit 0
    }
  } catch {
    ("{0} - ERROR: {1}" -f (Get-Date -Format o), $_.ToString()) | Tee-Object -FilePath $log -Append
  }
  Start-Sleep -Seconds 60
}
