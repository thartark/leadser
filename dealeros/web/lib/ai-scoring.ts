export interface LeadData {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  vehicleInterest?: string
  source: string
  interactions: Array<{ type: string; createdAt: Date }>
  timeInStage: number // hours
}

export interface ScoreFactors {
  name: string
  impact: number
  reason: string
}

export interface LeadScoreResult {
  score: number
  explanation: string
  factors: ScoreFactors[]
}

// AI-powered lead scoring based on multiple factors
export function calculateLeadScore(lead: LeadData): LeadScoreResult {
  let score = 50 // Base score
  const factors: ScoreFactors[] = []
  
  // Factor 1: Email present (15 points)
  if (lead.email) {
    score += 15
    factors.push({
      name: "Email Provided",
      impact: 15,
      reason: "Customer provided email address, indicating serious interest"
    })
  } else {
    factors.push({
      name: "Missing Email",
      impact: -5,
      reason: "No email address provided, harder to follow up"
    })
  }
  
  // Factor 2: Phone present (10 points)
  if (lead.phone) {
    score += 10
    factors.push({
      name: "Phone Number",
      impact: 10,
      reason: "Direct contact method available"
    })
  }
  
  // Factor 3: Vehicle specified (20 points)
  if (lead.vehicleInterest && lead.vehicleInterest.length > 0) {
    score += 20
    factors.push({
      name: "Specific Vehicle Interest",
      impact: 20,
      reason: `Customer interested in ${lead.vehicleInterest} - high intent signal`
    })
  }
  
  // Factor 4: Lead source quality
  const sourceScores: Record<string, { score: number; reason: string }> = {
    WEBSITE: { score: 15, reason: "Website leads show active research behavior" },
    PHONE: { score: 20, reason: "Phone call indicates immediate interest" },
    CHAT: { score: 18, reason: "Live chat engagement shows urgency" },
    REFERRAL: { score: 25, reason: "Referral leads have higher conversion rates" },
    SOCIAL_MEDIA: { score: 8, reason: "Social media leads often need more nurturing" },
    WALK_IN: { score: 30, reason: "In-person visit - highest intent signal" },
    SERVICE: { score: 12, reason: "Service customers have existing relationship" },
  }
  
  const sourceInfo = sourceScores[lead.source] || { score: 5, reason: "Standard lead source" }
  score += sourceInfo.score
  factors.push({
    name: "Lead Source Quality",
    impact: sourceInfo.score,
    reason: sourceInfo.reason
  })
  
  // Factor 5: Interaction count and recency
  const interactionCount = lead.interactions.length
  if (interactionCount > 0) {
    const interactionBonus = Math.min(interactionCount * 5, 20)
    score += interactionBonus
    factors.push({
      name: "Engagement Level",
      impact: interactionBonus,
      reason: `${interactionCount} interaction${interactionCount > 1 ? 's' : ''} - customer is engaged`
    })
  }
  
  // Factor 6: Time in stage (urgency)
  if (lead.timeInStage < 24) {
    score += 10
    factors.push({
      name: "Fresh Lead",
      impact: 10,
      reason: "Lead received in last 24 hours - high response priority"
    })
  } else if (lead.timeInStage > 72) {
    score -= 10
    factors.push({
      name: "Aging Lead",
      impact: -10,
      reason: "Lead is over 72 hours old - conversion probability decreasing"
    })
  }
  
  // Cap score between 0 and 100
  score = Math.min(Math.max(score, 0), 100)
  
  let explanation = ""
  if (score >= 80) {
    explanation = "Hot lead! High probability of conversion. Prioritize immediate follow-up."
  } else if (score >= 60) {
    explanation = "Warm lead. Good potential. Follow up within 24 hours."
  } else if (score >= 40) {
    explanation = "Warm lead needs nurturing. Add to automated sequence."
  } else {
    explanation = "Cold lead. Requires multiple touchpoints to re-engage."
  }
  
  return { score, explanation, factors }
}

export function getScoreColor(score: number): string {
  if (score >= 70) return "green"
  if (score >= 40) return "yellow"
  return "red"
}

export function getScoreBadgeVariant(score: number): "teal" | "amber" | "default" {
  if (score >= 70) return "teal"
  if (score >= 40) return "amber"
  return "default"
}
