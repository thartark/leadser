'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Phone, Mail, Calendar, Star, Clock, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  vehicleInterest?: string
  source: string
  status: string
  aiScore: number
  scoreExplanation?: string
  timeInStage: string
  lastContactAt?: string
  assignedTo?: { name: string; avatar?: string }
}

const stageColors: Record<string, string> = {
  NEW: 'bg-blue-500',
  CONTACTED: 'bg-yellow-500',
  APPOINTMENT_SET: 'bg-purple-500',
  TEST_DRIVE: 'bg-indigo-500',
  NEGOTIATING: 'bg-orange-500',
  CLOSED_WON: 'bg-green-500',
  CLOSED_LOST: 'bg-red-500',
}

const stageLabels: Record<string, string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  APPOINTMENT_SET: 'Appointment Set',
  TEST_DRIVE: 'Test Drive',
  NEGOTIATING: 'Negotiating',
  CLOSED_WON: 'Closed Won',
  CLOSED_LOST: 'Closed Lost',
}

interface LeadKanbanProps {
  leads: Lead[]
  onLeadClick: (lead: Lead) => void
  onStatusChange: (leadId: string, newStatus: string) => void
  onQuickAction: (lead: Lead, action: string) => void
}

export function LeadKanban({ leads, onLeadClick, onStatusChange, onQuickAction }: LeadKanbanProps) {
  const stages = ['NEW', 'CONTACTED', 'APPOINTMENT_SET', 'TEST_DRIVE', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST']
  
  const getLeadsByStage = (stage: string) => leads.filter(lead => lead.status === stage)
  
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return
    
    onStatusChange(draggableId, destination.droppableId)
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-50'
    if (score >= 40) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[600px]">
        {stages.map(stage => (
          <Droppable key={stage} droppableId={stage}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "w-80 flex-shrink-0 rounded-lg bg-gray-50 p-3",
                  snapshot.isDraggingOver && "bg-gray-100"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", stageColors[stage])} />
                    <h3 className="font-semibold text-sm">{stageLabels[stage]}</h3>
                    <Badge variant="default" className="ml-1">
                      {getLeadsByStage(stage).length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {getLeadsByStage(stage).map((lead, index) => (
                    <Draggable key={lead.id} draggableId={lead.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            "cursor-pointer hover:shadow-md transition-shadow",
                            snapshot.isDragging && "shadow-lg rotate-2"
                          )}
                          onClick={() => onLeadClick(lead)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {lead.firstName} {lead.lastName}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {lead.vehicleInterest || "No vehicle selected"}
                                </p>
                              </div>
                              <div className={cn("rounded-full px-2 py-0.5 text-xs font-medium", getScoreColor(lead.aiScore))}>
                                Score {lead.aiScore}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                              <Badge variant="teal" className="text-[10px]">
                                {lead.source}
                              </Badge>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{lead.timeInStage}</span>
                              </div>
                            </div>
                            
                            {lead.assignedTo && (
                              <div className="flex items-center gap-1 mt-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-[10px]">
                                    {lead.assignedTo.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-gray-500">{lead.assignedTo.name}</span>
                              </div>
                            )}
                            
                            <div className="flex gap-1 mt-3 pt-2 border-t">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => { e.stopPropagation(); onQuickAction(lead, 'call') }}
                              >
                                <Phone className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => { e.stopPropagation(); onQuickAction(lead, 'email') }}
                              >
                                <Mail className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => { e.stopPropagation(); onQuickAction(lead, 'schedule') }}
                              >
                                <Calendar className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}
