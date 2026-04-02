export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
    role: String!
    avatar: String
    createdAt: String!
  }

  type Lead {
    id: ID!
    firstName: String!
    lastName: String!
    email: String
    phone: String
    vehicleInterest: String
    vehicleYear: Int
    vehicleMake: String
    vehicleModel: String
    source: String!
    status: String!
    aiScore: Int
    scoreExplanation: String
    timeInStage: String!
    lastContactAt: String
    assignedTo: User
    createdBy: User!
    createdAt: String!
    interactions: [Interaction!]!
    tasks: [Task!]!
  }

  type Interaction {
    id: ID!
    type: String!
    direction: String
    subject: String
    content: String
    duration: Int
    leadId: ID!
    userId: ID!
    createdAt: String!
    user: User!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    dueDate: String!
    completed: Boolean!
    leadId: ID!
    userId: ID!
    lead: Lead!
    user: User!
  }

  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String
    phone: String
    lifetimeValue: Float
    churnRisk: String!
    vehicles: [Vehicle!]!
    leads: [Lead!]!
  }

  type Vehicle {
    id: ID!
    vin: String
    year: Int!
    make: String!
    model: String!
    trim: String
    price: Float!
    stockNumber: String
    status: String!
  }

  type LeadScore {
    score: Int!
    explanation: String!
    factors: [ScoreFactor!]!
  }

  type ScoreFactor {
    name: String!
    impact: Int!
    reason: String!
  }

  type Query {
    leads(status: String, assignedToId: String, source: String): [Lead!]!
    lead(id: ID!): Lead
    myLeads: [Lead!]!
    customers(search: String): [Customer!]!
    customer(id: ID!): Customer
    leadScore(leadId: ID!): LeadScore!
    pipelineStats: PipelineStats!
  }

  type PipelineStats {
    counts: [StageCount!]!
    averageTimeInStage: [StageTime!]!
    conversionRate: Float!
  }

  type StageCount {
    stage: String!
    count: Int!
  }

  type StageTime {
    stage: String!
    averageHours: Float!
  }

  type Mutation {
    createLead(input: CreateLeadInput!): Lead!
    updateLead(id: ID!, input: UpdateLeadInput!): Lead!
    deleteLead(id: ID!): Boolean!
    updateLeadStatus(id: ID!, status: String!): Lead!
    assignLead(id: ID!, userId: ID!): Lead!
    addInteraction(input: AddInteractionInput!): Interaction!
    addTask(input: AddTaskInput!): Task!
    completeTask(id: ID!): Task!
    bulkUpdateLeads(ids: [ID!]!, status: String, assignedToId: String): BulkUpdateResult!
  }

  input CreateLeadInput {
    firstName: String!
    lastName: String!
    email: String
    phone: String
    vehicleInterest: String
    vehicleYear: Int
    vehicleMake: String
    vehicleModel: String
    source: String
  }

  input UpdateLeadInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    vehicleInterest: String
  }

  input AddInteractionInput {
    leadId: ID!
    type: String!
    direction: String!
    subject: String
    content: String
    duration: Int
  }

  input AddTaskInput {
    leadId: ID!
    title: String!
    description: String
    dueDate: String!
  }

  type BulkUpdateResult {
    success: Boolean!
    updatedCount: Int!
    message: String
  }
`
