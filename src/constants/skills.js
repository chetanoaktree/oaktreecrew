const SKILLS = [
                  { value: '', label: 'Select' },
                  { value: 'HTML', label: 'HTML', key: 'Salesforce Developer, ROR Developer, React Developer, NodeJS Developer' },
                  { value: 'CSS', label: 'CSS', key: 'Salesforce Developer, ROR Developer, React Developer, NodeJS Developer' },
                  { value: 'JavaScript', label: 'JavaScript', key: 'Salesforce Developer, ROR Developer, React Developer, NodeJS Developer' },
                  { value: 'Rails', label: 'Rails', key: 'ROR Developer' },
                  { value: 'ERP', label: 'ERP', key: 'ROR Developer' },
                  { value: 'Postgres', label: 'Postgres', key: 'ROR Developer' },
                  { value: 'Swift', label: 'Swift', key: 'IOS Developer' },
                  { value: 'Objective C', label: 'Objective C', key: 'IOS Developer' },
                  { value: 'Express', label: 'Express', key: 'NodeJS Developer' },
                  { value: 'Redux', label: 'Redux', key: 'React Developer' },
                  { value: 'Flux', label: 'Flux', key: 'React Developer' },
                  {
                  "label": "React js", "value": "React js"
                  },
                  {
                  "label": "React Native Developer", "value": "React Native Developer"
                  },
                  {
                  "label": "ReactJS & React Native Engineer", "value": "ReactJS & React Native Engineer"
                  },
                  {
                  "label": "React Developer", "value": "React Developer"
                  },
                  {
                  "label": "react", "value": "react"
                  },
                  {
                  "label": "Reactjs issue fix", "value": "Reactjs issue fix"
                  },
                  {
                  "label": "React Developer", "value": "React Developer"
                  },
                  {
                  "label": "React Native", "value": "React Native"
                  },
                  {
                  "label": "RealTime Quality Enforcer", "value": "RealTime Quality Enforcer"
                  },
                  {
                  "label": "Research Scientist Intern", "value": "Research Scientist Intern"
                  },
                  {
                  "label": "Research Scientist", "value": "Research Scientist"
                  },
                  {
                  "label": "Resource Management Analyst", "value": "Resource Management Analyst"
                  },
                  {
                  "label": "Recruitment", "value": "Recruitment"
                  },
                  {
                  "label": "Remote Software Engineer", "value": "Remote Software Engineer"
                  },
                  {
                  "label": "Resident ", "value": "Resident "
                  },
                  {
                  "label": "Regional advisor", "value": "Regional advisor"
                  },
                  {
                  "label": "Research Associate", "value": "Research Associate"
                  },
                  {
                  "label": "Reservoir Geophysicist", "value": "Reservoir Geophysicist"
                  },
                  {
                  "label": "Research Assitant", "value": "Research Assitant"
                  },
                  {
                  "label": "Research work online", "value": "Research work online"
                  },
                  {
                  "label": "Remote Data Science Intern", "value": "Remote Data Science Intern"
                  },
                  {
                  "label": "Regional HR Director", "value": "Regional HR Director"
                  },
                  {
                  "label": "Research Intern", "value": "Research Intern"
                  },
                  {
                  "label": "Research Analyst", "value": "Research Analyst"
                  },
                  {
                  "label": "Research Assistant", "value": "Research Assistant"
                  },
                  {
                  "label": "Researcher and Project Manager", "value": "Researcher and Project Manager"
                  },
                  {
                  "label": "Regional Manager", "value": "Regional Manager"
                  },
                  {
                  "label": "Researcher", "value": "Researcher"
                  },
                  {
                  "label": "Regional Technology Manager", "value": "Regional Technology Manager"
                  },
                  {
                  "label": "Requirements Engineer", "value": "Requirements Engineer"
                  },
                  {
                  "label": "Recruiter", "value": "Recruiter"
                  },
                  {
                  "label": "re", "value": "re"
                  },
                  {
                  "label": "Ror Backend Developer", "value": "Ror Backend Developer"
                  },
                  {
                  "label": "RoR Developer", "value": "RoR Developer"
                  },
                  {
                  "label": "ro", "value": "ro"
                  },
                  {
                  "label": "Robotic Process Automation Developer", "value": "Robotic Process Automation Developer"
                  },
                  {
                  "label": "ROS", "value": "ROS"
                  },
                  {
                  "label": "iOS Product Engineer", "value": "iOS Product Engineer"
                  },
                  {
                  "label": "iOS Engineer", "value": "iOS Engineer"
                  },
                  {
                  "label": "iOS Developer", "value": "iOS Developer"
                  },
                  {
                  "label": "iOS Freelancer", "value": "iOS Freelancer"
                  },
                  {
                  "label": "iOS Developer", "value": "iOS Developer"
                  },
                  {
                  "label": "iOS application Developer", "value": "iOS application Developer"
                  },
                  {
                  "label": "iOS/Android Developer", "value": "iOS/Android Developer"
                  },
                  {
                  "label": "IOS Developer", "value": "IOS Developer"
                  },
                  {
                  "label": "salesforce administrator", "value": "salesforce administrator"
                  },
                  {
                  "label": "Salesforce Consultant", "value": "Salesforce Consultant"
                  },
                  {
                  "label": "Salesforce Developer", "value": "Salesforce Developer"
                  },
                  {
                  "label": "Salesforce Architect/Developer", "value": "Salesforce Architect/Developer"
                  },
                  {
                  "label": "Sales roles", "value": "Sales roles"
                  },
                  {
                  "label": "sales engineer", "value": "sales engineer"
                  },
                  {
                  "label": "sales", "value": "sales"
                  },
                  {
                  "label": "Sales & Business Development", "value": "Sales & Business Development"
                  },
                  {
                  "label": "Sales ", "value": "Sales "
                  },
                  {
                  "label": "SAS Devoloper", "value": "SAS Devoloper"
                  },
                  {
                  "label": "SAP Mobile Architect and Consultant", "value": "SAP Mobile Architect and Consultant"
                  },
                  {
                  "label": "Sap", "value": "Sap"
                  },
                  {
                  "label": "SAP MM/WM ", "value": "SAP MM/WM "
                  },
                  {
                  "label": "node backend", "value": "node backend"
                  },
                  {
                  "label": "Nodejs ,React js,Php", "value": "Nodejs ,React js,Php"
                  },
                  {
                  "label": "Node.js, Golang, React", "value": "Node.js, Golang, React"
                  },
                  {
                  "label": "Node.js ", "value": "Node.js "
                  },
                  {
                  "label": "NodeJs", "value": "NodeJs"
                  },
                  {
                  "label": "NOC / SOC Analyst", "value": "NOC / SOC Analyst",
                  }
                ]  

export default SKILLS;