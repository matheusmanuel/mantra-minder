Add-type -AssemblyName -System.Windows.Forms
$global:notif = New-Object System.Windows.Forms.notifyIcon
$path = (Get-Process -id $PID).path
$notif.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon($path)
$notif.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Info
$notif.BalloonTipText = "This is to let you know the script is done"
$notif.BalloonTipTitle = "Script for AD Users"
$notif.Visible = true
$notif.ShowBallonTip(10000)