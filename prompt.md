I would redesign the dashboard around a "Cyber Security Control Tower" concept rather than Endpoint/Server/Network/IAM silos.
Proposed Navigation
 
┌───────────────────────────────────────────────────────────┐
│                 CYBER SECURITY CONTROL TOWER             │
└───────────────────────────────────────────────────────────┘
Overview
├── Asset Coverage
├── Protection Status
├── Vulnerabilities & Patch
├── Identity & Access
├── Network Security
├── Cloud Security
└── Compliance
Landing Page (Executive View)
Instead of showing endpoints, servers and IAM separately, show:
 
┌───────────────────────────────────────────┐
│ Overall Security Score       87/100       │
└───────────────────────────────────────────┘
┌──────────┬──────────┬──────────┬──────────┐
│ Assets   │ Identity │ Network  │ Cloud    │
│ 92%      │ 85%      │ 88%      │ 81%      │
└──────────┴──────────┴──────────┴──────────┘
┌───────────────────────────────────────────┐
│ Top Risks Requiring Attention             │
└───────────────────────────────────────────┘
 Defender Missing : 143 Assets
 Critical Patch Missing : 82 Assets
 DLP Not Enabled : 312 Users
 MFA Missing : 26 Accounts
 Bitlocker Coverage : 98%
Asset Coverage Section
This becomes the inventory section.
Device Estate
 
Total Assets
├── Windows
├── Mac
├── iOS
├── Android
└── Servers
Interactive visualization:
 
             Assets
                │
 ┌──────────────┼──────────────┐
 │              │              │
Endpoints    Servers      Cloud Assets
Clicking any node drills down.
Protection Coverage Section
All security controls grouped together.
Endpoint Security Coverage
 
Defender Coverage
BitLocker Coverage
ZIA Coverage
DLP Coverage
Windows Activation
MDC Coverage
Instead of rows:
 
                Coverage Ring
 Defender      95%
 Bitlocker     98%
 DLP           72%
 ZIA           81%
Each as a circular KPI.
This instantly highlights gaps.
Vulnerability & Patching Section
Much more impactful visually.
Patch Compliance
 
┌─────────────────────────────────┐
│ N      N-1      N-2     > N-2   │
│ 92%    4%       2%      2%      │
└─────────────────────────────────┘
EOL/EOS
 
Windows Server 2012 : 17
Windows 10 : 53
Ubuntu 18.04 : 12
Data Sources
Nessus
Wiz
Defender
SCCM
All correlated into one view.
Identity & Access Section
Much stronger grouping.
Identity Security
 
Employees
Service Accounts
Privileged Accounts
Domain Admins
Cloud Admins
Accounts Without MFA
Accounts With No Expiry
Instead of cards:
 
Privileged Accounts Risk Matrix
                MFA
            Yes        No
Admin       80         12
Service     310        35
User        9200       45
This tells a story immediately.
Network Security Section
 
VPN Users
Firewall Inventory
Firewall Licensing
Firewall Exposure
Firewall Admin Accounts
Visual:
 
            Network Assets
                    │
 ┌──────────────────┼─────────────────┐
 │                  │                 │
DC Firewalls    VAC Firewalls     VPN Users
Color based on health.
Cloud Security Section
This deserves its own area.
Cloud Governance
 
AWS Inventory
Azure Inventory
Cloud Onboarding
Wiz Coverage
Cloud Logging Coverage
Visual:
 
AWS      Azure
 │          │
 └──── Wiz ────┘
Coverage: 88%
Data Integration Layer
One innovative panel that auditors and management usually love:
 
┌─────────────────────────────────────────┐
│ Security Data Reliability               │
└─────────────────────────────────────────┘
AD             
Intune         
Defender       
Wiz            
FortiManager   
Accops         
Nessus         
Sentinel       
Shows freshness and data quality.
Modern UI Layout
Instead of conventional tables:
Top
Glassmorphism header
Security Score
Asset Counter
Trend Indicators
Center
Interactive Security Hexagon
 
                IAM
   Network                 Cloud
 Vulnerability         Endpoint
Each segment clickable.
Bottom
 
Risk Trends
Compliance Trends
Coverage Trends
with 30/90/180-day movement.
What I would build for a CISO dashboard
Organize everything into six domains only:
Asset Inventory
Protection Coverage
Vulnerability & Patching
Identity & Access
Network Security
Cloud Security
This is far more intuitive than Endpoint/Server/Network/IAM because it answers the questions executives actually ask:
What assets do we have?
How well are they protected?
Where are the vulnerabilities?
Who has privileged access?
Is the network secure?
Is the cloud environment covered?
That structure will look significantly more modern, scalable, and executive-friendly than the original categorization.
Vulnerabilities tab is needed
Scoping → Discovery → Prioritization → Validation → Mobilization
Database Logs Integration with Sentinel
[External] Threat Bulletin - SOC Threat Intelligence Team: MS reveal Passkey-themed social engineering leading to ID compromise
make a attractive multipge detail intractive , clicakble ui prototype 
you can take the refarace from attached image 
also check the bellow table need to add 
Endpoint
Source 1
Source 2
 
Zscaler - ZIA not deployed (Laptops)
Zscaler
AD/DNS/DHCP
 
DLP - Policy not enabled
Zscaler
AD/Intune
 
Older than N-2 Patching
Intune/Defender
Sccm
 
EOL/EOS
Intune/Defender
 
 
OS
Intune/Defender
 
 
BitLocker
Intune/Defender
 
 
Defender
Intune/Defender
AD/DNS/DHCP
 
Android
Intune/Defender
 
 
MAC
Intune/Defender
 
 
IOS
Intune/Defender
 
 
Windows Activation
Intune/Defender
 
 
 
 
 
 
Servers
Source 1
Source 2
 
Defender
Intune/Defender
AD/DNS/DHCP
 
MDC
MDC Portal
AD/DNS/DHCP
 
Older than N-1 Patching
Nessus/Defender
WIZ
 
EOL/EOS
Nessus/Defender
WIZ
 
OS
Nessus/Defender
WIZ
 
Cloud Onboarding on WIZ
WIZ
Senitnel
 
 
 
 
 
Network
Source 1
Source 2
Source 3
VPN Users Forti Client
Forti Console
AD OU
 
VPN Users (Accops
Accops Portal
AD OU
 
Count Of DC FW
Nessus
Port Scanning
Tufin/Nipper
Count Of VAC FW
Nessus
Port Scanning
Tufin/Nipper
Licensing
 
 
 
 
 
 
 
IAM
Source 1
Source 2
Source 3
No. of Emp
AD
 
 
MFA ENABled
AD
 
 
Service Acc
AD
 
 
Domain Admin
AD
 
 
Local Admin (Endpoint)
Defender
 
 
Linux Local Admin (Server)
Defender
 
 
Windows Local Admin (Server)
Defender
 
 
Local Admin (FW)
Forti Manager
 
 
Local Admin (Database)
Sentinel
AWS IAM
Azure IAM
AWS / Azure Admin
AWS IAM
Azure IAM
WIZ
Yandex
Yandex Portal
 
 
AWS Inventory
Sentinel
WIZ
 
DB Encryption
WIZ
AD
 
Azure Monitor/CloudTrail/GuardDuty
WIZ
Sentinel
 
ID's having no password expiry 
 
 use light theam 