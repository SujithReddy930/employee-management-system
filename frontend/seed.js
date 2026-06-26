const BASE_URL = 'https://employee-management-system-production-79a4.up.railway.app/api';

const departments = [
  { name: "Engineering", description: "Software Engineering Team", managerName: "Rajesh Kumar", location: "Hyderabad" },
  { name: "Human Resources", description: "HR and Recruitment", managerName: "Priya Sharma", location: "Hyderabad" },
  { name: "Finance", description: "Finance and Accounting", managerName: "Suresh Reddy", location: "Mumbai" },
  { name: "Marketing", description: "Marketing and Branding", managerName: "Anita Singh", location: "Delhi" },
  { name: "Sales", description: "Sales and Business Development", managerName: "Vikram Patel", location: "Bangalore" },
  { name: "IT Support", description: "IT Infrastructure and Support", managerName: "Kiran Rao", location: "Hyderabad" },
  { name: "Operations", description: "Operations and Logistics", managerName: "Meena Iyer", location: "Chennai" },
  { name: "Legal", description: "Legal and Compliance", managerName: "Arjun Nair", location: "Mumbai" },
  { name: "Research & Development", description: "Product R&D", managerName: "Deepa Menon", location: "Bangalore" },
  { name: "Customer Support", description: "Customer Service", managerName: "Ravi Teja", location: "Hyderabad" },
  { name: "Product Management", description: "Product Strategy", managerName: "Sneha Gupta", location: "Delhi" },
  { name: "Design", description: "UI/UX and Graphic Design", managerName: "Arun Kumar", location: "Bangalore" },
  { name: "Data Analytics", description: "Data Science and Analytics", managerName: "Pooja Verma", location: "Hyderabad" },
  { name: "Cybersecurity", description: "Security Operations", managerName: "Rahul Mishra", location: "Delhi" },
  { name: "Cloud Infrastructure", description: "Cloud and DevOps", managerName: "Sanjay Pillai", location: "Bangalore" },
  { name: "Quality Assurance", description: "Testing and QA", managerName: "Lakshmi Devi", location: "Hyderabad" },
  { name: "Business Intelligence", description: "BI and Reporting", managerName: "Mohit Agarwal", location: "Mumbai" },
  { name: "Administration", description: "Office Administration", managerName: "Kavita Joshi", location: "Delhi" },
  { name: "Supply Chain", description: "Supply Chain Management", managerName: "Harish Babu", location: "Chennai" },
  { name: "Training & Development", description: "Employee Training", managerName: "Divya Krishnan", location: "Hyderabad" }
];

const firstNames = ["Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Rohan","Kiran","Ravi","Suresh",
  "Priya","Sneha","Pooja","Anita","Meena","Deepa","Lakshmi","Kavita","Divya","Nisha"];
const lastNames = ["Kumar","Sharma","Reddy","Patel","Singh","Rao","Nair","Menon","Iyer","Pillai",
  "Gupta","Verma","Mishra","Agarwal","Joshi","Babu","Devi","Krishnan","Teja","Naidu"];
const positions = ["Software Developer","Senior Engineer","Team Lead","Analyst","Consultant",
  "Manager","Coordinator","Specialist","Executive","Associate"];
const statuses = ["ACTIVE","ACTIVE","ACTIVE","ACTIVE","INACTIVE","ON_LEAVE"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const start = new Date(2018, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function randomSalary() {
  return Math.floor(Math.random() * 80000 + 30000);
}

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  const createdDepartments = [];

  // Create departments
  for (let i = 0; i < departments.length; i++) {
    try {
      const res = await fetch(`${BASE_URL}/departments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(departments[i])
      });
      const dept = await res.json();
      createdDepartments.push(dept);
      console.log(`✅ Department created: ${dept.name} (id: ${dept.id})`);
    } catch (err) {
      console.error(`❌ Failed to create department: ${departments[i].name}`, err.message);
    }
  }

  console.log(`\n📊 Created ${createdDepartments.length} departments\n`);
  console.log('👥 Now creating employees...\n');

  let totalEmployees = 0;

  // Create 15 employees per department
  for (const dept of createdDepartments) {
    for (let i = 0; i < 15; i++) {
      const firstName = randomItem(firstNames);
      const lastName = randomItem(lastNames);
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random()*999)}@company.com`;

      const employee = {
        firstName,
        lastName,
        email,
        phone: `9${Math.floor(Math.random() * 900000000 + 100000000)}`,
        position: randomItem(positions),
        salary: randomSalary(),
        joiningDate: randomDate(),
        status: randomItem(statuses),
        department: { id: dept.id }
      };

      try {
        const res = await fetch(`${BASE_URL}/employees`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(employee)
        });
        if (res.ok) {
          totalEmployees++;
          console.log(`  ✅ Employee ${i+1}/15: ${firstName} ${lastName} → ${dept.name}`);
        }
      } catch (err) {
        console.error(`  ❌ Failed: ${firstName} ${lastName}`, err.message);
      }
    }
    console.log(`  📁 Done with ${dept.name}\n`);
  }

  console.log(`\n🎉 Seeding complete!`);
  console.log(`✅ ${createdDepartments.length} departments created`);
  console.log(`✅ ${totalEmployees} employees created`);
  console.log(`\n🌐 Visit your app: https://employee-management-system-eosin-delta.vercel.app`);
}

seed();