export type Project = {
  title: string
  description: string
  technologies: string[]
}

export type CredentialDetail = {
  label: string
  value: string
}

export type Credential = {
  title: string
  issuer?: string
  kind: string
  date?: string
  status?: string
  preview?: string
  document?: string
  verificationUrl?: string
  imageAlt?: string
  details?: CredentialDetail[]
  notes?: string[]
}

export const projects: Project[] = [
  {
    title: 'Role-based device access with AAA and RADIUS',
    description:
      'Configured AAA authentication and authorization with Windows Server RADIUS in a lab environment, enabling secure, role-based administrative access to network devices.',
    technologies: [
      'AAA',
      'RADIUS',
      'Windows Server 2019 and 2022',
      'Network device administration',
      'Authentication',
      'Authorization',
      'Role-based access',
    ],
  },
  {
    title: 'FortiGate security, VPN and high availability',
    description:
      'Built and tested FortiGate lab configurations for firewall policies, NAT, web filtering, application control, DNS filtering, IPS and SSL inspection. Configured IPsec and SSL VPNs, log monitoring, LDAP, FSSO, high availability, multi-VDOM and transparent mode.',
    technologies: [
      'Fortinet FortiGate',
      'Firewall policies',
      'NAT',
      'Web filtering',
      'Application control',
      'DNS filtering',
      'IPS',
      'SSL inspection',
      'IPsec VPN',
      'SSL VPN',
      'LDAP',
      'FSSO',
      'High availability',
      'Multi-VDOM',
      'Transparent mode',
    ],
  },
  {
    title: 'Cisco ASA routing, firewall and VPN lab',
    description:
      'Configured Cisco ASA interface security levels, static and dynamic routing, NAT, access control lists and object groups in a lab environment. Explored routed and transparent modes, failover, clustering, security contexts and LAN-to-LAN IPsec VPNs.',
    technologies: [
      'Cisco ASA',
      'Static routing',
      'EIGRP',
      'OSPF',
      'BGP',
      'NAT',
      'ACLs',
      'Object groups',
      'Routed mode',
      'Transparent mode',
      'Failover',
      'Clustering',
      'Security contexts',
      'LAN-to-LAN IPsec VPN',
    ],
  },
]

export const credentials: Credential[] = [
  {
    title: 'Cisco Certified Network Associate (CCNA)',
    issuer: 'Cisco',
    kind: 'Professional certification',
    date: 'Certified 24 August 2026',
    status: 'Active through 24 August 2029',
    preview: '/certificates/previews/cisco-ccna.webp',
    document: '/certificates/cisco-ccna.pdf',
    imageAlt:
      'Cisco Certified Network Associate certificate issued to Mohamad Waseer Mohammad Wazaan',
    details: [
      { label: 'Cisco ID', value: 'CSCO14914494' },
      {
        label: 'Verification number',
        value: '1689c514d47b4c0fbf6a57682e1b114d',
      },
      {
        label: 'Issued to',
        value: 'Mohamad Waseer Mohammad Wazaan',
      },
    ],
  },
  {
    title: 'Cybersecurity Job Simulation',
    issuer: 'Mastercard via Forage',
    kind: 'Job simulation',
    date: 'Completed 26 October 2026',
    status: 'Completed',
    preview: '/certificates/previews/mastercard-cybersecurity-simulation.webp',
    document: '/certificates/mastercard-cybersecurity-simulation.pdf',
    imageAlt:
      'Mastercard Cybersecurity Job Simulation certificate issued to Wazaan Wazeer',
    details: [
      {
        label: 'Enrolment verification',
        value: '6adf546f47a1dd579ba41cdc',
      },
      {
        label: 'User verification',
        value: '6adf538947a1dd579ba3ef2f',
      },
    ],
    notes: [
      'Designed a phishing email simulation',
      'Interpreted phishing simulation results',
    ],
  },
  {
    title: 'Certified Ethical Hacker Preparatory Course',
    issuer: 'ATN Campus',
    kind: 'Course completion',
    date: 'Completed 22 March 2025',
    status: 'Preparatory course',
    preview: '/certificates/previews/ethical-hacker-preparatory-course.webp',
    document: '/certificates/ethical-hacker-preparatory-course.pdf',
    imageAlt:
      'ATN Campus Certified Ethical Hacker preparatory course certificate issued to M.W.M Wazaan',
    details: [
      { label: 'Active Tech ID', value: 'ATN/CN/23196' },
      { label: 'TVEC registration', value: 'P01/0752' },
      { label: 'Issued to', value: 'M.W.M Wazaan' },
    ],
  },
  {
    title: 'Linux Essential Preparatory Course',
    issuer: 'ATN Campus',
    kind: 'Course completion',
    date: 'Completed 22 March 2025',
    status: 'Preparatory course',
    preview: '/certificates/previews/linux-essential-preparatory-course.webp',
    document: '/certificates/linux-essential-preparatory-course.pdf',
    imageAlt:
      'ATN Campus Linux Essential preparatory course certificate issued to M.W.M Wazaan',
    details: [
      { label: 'Active Tech ID', value: 'ATN/CN/23196' },
      { label: 'TVEC registration', value: 'P01/0752' },
      { label: 'Issued to', value: 'M.W.M Wazaan' },
    ],
  },
  {
    title: 'Computer Hardware Basics',
    issuer: 'Cisco Networking Academy',
    kind: 'Course completion',
    date: 'Issued 5 April 2025',
    status: 'Completed',
    preview: '/certificates/previews/computer-hardware-basics.webp',
    document: '/certificates/computer-hardware-basics.pdf',
    imageAlt:
      'Cisco Networking Academy Computer Hardware Basics certificate issued to Wazaan Wazeer',
    details: [{ label: 'Issued to', value: 'Wazaan Wazeer' }],
    notes: [
      'Installed components to build, repair or upgrade personal computers',
      'Covered hardware, preventive maintenance, laptops and mobile devices',
      'Covered general and fire safety standards',
    ],
  },
  {
    title: 'Linux Unhatched',
    issuer: 'Cisco Networking Academy with NDG',
    kind: 'Statement of achievement',
    date: 'Issued 21 April 2025',
    status: 'Completed',
    preview: '/certificates/previews/linux-unhatched.webp',
    document: '/certificates/linux-unhatched.pdf',
    imageAlt:
      'Cisco Networking Academy Linux Unhatched statement of achievement issued to Wazaan Wazeer',
    details: [{ label: 'Issued to', value: 'Wazaan Wazeer' }],
    notes: [
      'Used the Linux command line and navigated system directories',
      'Managed files, users, permissions and ownership settings',
      'Worked with scripts and networking configuration',
    ],
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    kind: 'Course completion',
    date: 'Issued 26 March 2025',
    status: 'Completed',
    preview: '/certificates/previews/introduction-to-cybersecurity.webp',
    document: '/certificates/introduction-to-cybersecurity.pdf',
    imageAlt:
      'Cisco Networking Academy Introduction to Cybersecurity certificate issued to Wazaan Wazeer',
    details: [{ label: 'Issued to', value: 'Wazaan Wazeer' }],
    notes: [
      'Covered online safety and cybersecurity impact',
      'Covered common cyber threats, attacks and vulnerabilities',
      'Covered personal and organizational protection practices',
    ],
  },
  {
    title: 'AWS Knowledge: Cloud Essentials',
    issuer: 'Amazon Web Services',
    kind: 'Digital badge',
    status: 'Trained',
    preview: '/certificates/previews/aws-cloud-essentials-badge.webp',
    verificationUrl:
      'https://www.credly.com/badges/2d879c49-391c-4a39-978c-4e0b2ebe2c03/public_url',
    imageAlt:
      'AWS Knowledge Cloud Essentials Trained digital badge issued to Wazaan Wazeer',
    details: [{ label: 'Credential holder', value: 'Wazaan Wazeer' }],
  },
]

export const skillGroups = [
  {
    name: 'Networking',
    items: [
      'NetFlow',
      'SPAN',
      'VLANs',
      'OSPF',
      'EIGRP',
      'BGP',
      'FHRP',
      'NAT',
      'DHCP',
      'QoS',
      'IPsec',
      'DMVPN',
      'MPLS',
      'AAA',
      'Routing and switching',
      'Wireless networking',
      'IoT networking',
      'Cloud networking',
    ],
  },
  {
    name: 'Firewall and security',
    items: [
      'Cisco ASA',
      'Fortinet FortiGate',
      'Fortinet NGFW',
      'Network security',
      'Cybersecurity',
      'Firewall policies',
      'Access control lists',
      'VPN technologies',
      'Network access control',
      'Security monitoring',
    ],
  },
  {
    name: 'Systems and virtualization',
    items: [
      'Windows 10 and 11',
      'Windows Server 2019 and 2022',
      'Linux',
      'Active Directory',
      'DNS',
      'Microsoft 365',
      'VMware Workstation',
      'VMware ESXi',
      'Virtualization',
    ],
  },
  {
    name: 'Security and network tools',
    items: ['Nessus', 'Wireshark', 'Nmap', 'Metasploit'],
  },
  {
    name: 'Cloud',
    items: [
      'Microsoft Azure fundamentals',
      'AZ-900 course completed',
      'AWS cloud fundamentals',
      'Cloud networking',
    ],
  },
  {
    name: 'Professional skills',
    items: [
      'Project management',
      'Problem-solving',
      'Analytical thinking',
      'Critical thinking',
      'Team collaboration',
      'Time management',
      'Adaptability',
      'Attention to detail',
      'Quick learning',
    ],
  },
  {
    name: 'Languages',
    items: ['English', 'Tamil', 'Sinhala'],
  },
]
