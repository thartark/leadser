import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstNames = ['Michael', 'Sarah', 'James', 'Emily', 'David', 'Jessica', 'Daniel', 'Lisa', 'Robert', 'Amanda']
const lastNames = ['Chen', 'Williams', 'Rodriguez', 'Davis', 'Brown', 'Jones', 'Miller', 'Garcia', 'Wilson', 'Martinez']
const vehicles = ['2024 Tesla Model 3', '2024 Ford F-150', '2024 BMW X5', '2024 Toyota Camry', '2024 Honda CR-V', '2024 Chevrolet Silverado', '2024 Mercedes C-Class', '2024 Audi Q5', '2024 Hyundai Tucson', '2024 Kia Telluride']
const sources = ['WEBSITE', 'PHONE', 'CHAT', 'REFERRAL', 'SOCIAL_MEDIA', 'WALK_IN']
const statuses = ['NEW', 'CONTACTED', 'APPOINTMENT_SET', 'TEST_DRIVE', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST']

async function main() {
  console.log('🌱 Seeding database...')
  
  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'sarah.johnson@dealeros.com' },
    update: {},
    create: {
      email: 'sarah.johnson@dealeros.com',
      name: 'Sarah Johnson',
      role: 'SALESPERSON',
    },
  })
  
  // Create 50 fake leads
  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const score = Math.floor(Math.random() * 100)
    
    // Generate random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - daysAgo)
    
    // Generate random last contact date
    const lastContactAt = Math.random() > 0.3 ? new Date(createdAt.getTime() + Math.random() * 86400000 * 3) : null
    
    await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        vehicleInterest: vehicle,
        source,
        status,
        aiScore: score,
        scoreExplanation: score > 70 ? "Hot lead - multiple interactions, high engagement" : score > 40 ? "Warm lead - needs nurturing" : "Cold lead - requires re-engagement",
        timeInStage: createdAt,
        lastContactAt,
        assignedToId: user.id,
        createdAt,
      },
    })
  }
  
  // Create some interactions for each lead
  const leads = await prisma.lead.findMany()
  for (const lead of leads) {
    const numInteractions = Math.floor(Math.random() * 5)
    for (let i = 0; i < numInteractions; i++) {
      const types = ['CALL', 'EMAIL', 'SMS']
      const type = types[Math.floor(Math.random() * types.length)]
      const direction = Math.random() > 0.5 ? 'OUTBOUND' : 'INBOUND'
      const content = type === 'CALL' ? 'Discussed vehicle options and financing' : type === 'EMAIL' ? 'Sent pricing and availability' : 'Confirmed appointment time'
      
      await prisma.interaction.create({
        data: {
          type,
          direction,
          content,
          duration: type === 'CALL' ? Math.floor(Math.random() * 20) + 5 : null,
          leadId: lead.id,
          userId: user.id,
        },
      })
    }
  }
  
  console.log('✅ Seeded 50 leads with interactions!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
