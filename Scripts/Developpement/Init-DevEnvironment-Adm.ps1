# -----
# 1. Parameters
# -----

[CmdletBinding()]
Param(
    # Only undo the installation process
    [Parameter(HelpMessage = "Only undo the installation process?" )]
    [switch]$OnlyUndo
)

# -----
# Constants
# -----

[string]$Script:CertificateSubject = "CN=*.lvh.me, OU=Test Local, O=Action Logement Services, L=Paris, S=IDF, C=FR"
[string]$Script:PfxPassword = "Als!2018"
[string]$Script:ConfigFileName = "config.json"
$Script:DefaultCAStore = Resolve-Path -Path "Cert:\CurrentUser\Root" # "Cert:\LocalMachine\Root"
$Script:SourcePath = [System.IO.Path]::GetFullPath("$PSScriptRoot\..\..\Source")

# -----
# Init
# -----

#Requires -RunAsAdministrator
$ErrorActionPreference = "Stop";
Set-StrictMode -Version Latest
Import-Module $PSScriptRoot\Modules\DevelopmentWebServer.psm1 -Force

# -----
# Main
# -----
$sites = Get-Content $PSScriptRoot\$Script:ConfigFileName | ConvertFrom-Json
$ports = $sites | Select-Object -ExpandProperty port -Unique

# 1.Retrieve or install CA certificate
$rootCACertificate = Get-ChildItem $Script:DefaultCAStore | Where-Object {$_.Subject -eq $Script:CertificateSubject}
if ($null -eq $rootCACertificate) {
    Write-Verbose "Adding certificate to trusted root authorities computer store"
    $rootCACertificate = Import-PfxCertificate -FilePath $PSScriptRoot\Certificates\lvh.me.pfx -Password (ConvertTo-SecureString -String $Script:PfxPassword -AsPlainText -Force) -CertStoreLocation $Script:DefaultCAStore
}

# 2.Retrieve or install server certificate
$serverCertificate = Get-ChildItem Cert:\LocalMachine\My -SSLServerAuthentication | Where-Object {$_.Subject -eq $Script:CertificateSubject}
if ($null -eq $serverCertificate) {
    Write-Verbose "Adding certificate to personal computer store"
    $serverCertificate = Import-PfxCertificate -FilePath $PSScriptRoot\Certificates\lvh.me.pfx -Password (ConvertTo-SecureString -String $Script:PfxPassword -AsPlainText -Force) -CertStoreLocation Cert:\LocalMachine\My
}

# 3.Register urls
ForEach ($site in $sites) {
    Register-HttpsUrl $site.name $site.port -OnlyUndo:$OnlyUndo
}

# 4.Binding certificates
Use-CertificateForPort $serverCertificate.Thumbprint $ports -OnlyUndo:$OnlyUndo

# 5.Modifiy IIS Express ApplicationHost.config for Asp.Net project
# PS: do not call this for Asp.Net.Core project
$aspNetSites = $sites | Where-Object {$true -eq $_.PSObject.Properties['aspNetProject']}

ForEach ($site in $aspNetSites) {
    $projectPath = "$Script:SourcePath\$($site.aspNetProject)"
    Write-Verbose "Updating ApplicationHost.config for $projectPath"
    Set-SiteInApplicationHostConfig $site.aspNetProject $projectPath $site.name $site.port -OnlyUndo:$OnlyUndo
}

