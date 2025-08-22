"use client"

import { MapPin, Linkedin, Instagram, Facebook, Eye, UserPlus, MessageCircle } from "lucide-react"
import { useState } from "react"
import { ProfessionalProfileModal } from "./professional-profile-modal"

interface ProfessionalCardProps {
  professional: Professional
  isConnected?: boolean
  onConnect?: (id: string) => void
  onMessage?: (id: string) => void
}

export function ProfessionalCard({ professional, isConnected = false, onConnect, onMessage }: ProfessionalCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card className="hover:shadow-md transition-all duration-200 bg-white border border-gray-100 rounded-lg">
        <CardContent className="p-5">
          {/* Header with Name and Specialty */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{professional.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                  {professional.specialty}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 font-medium">
                  Ativo
                </Badge>
              </div>
            </div>
          </div>

          {/* Identification Code */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1 font-medium">Código de Identificação:</p>
            <p className="font-mono text-sm font-semibold text-gray-800">{professional.code}</p>
          </div>

          {/* Service Locations */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2 font-medium">Locais de atendimento:</p>
            <div className="space-y-2">
              {professional.serviceLocations.slice(0, 2).map((location, index) => (
                <div key={index} className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">{location.name}</p>
                    <p className="text-gray-500 text-xs">{location.city}</p>
                  </div>
                </div>
              ))}
              {professional.serviceLocations.length > 2 && (
                <p className="text-xs text-gray-500 ml-6">+{professional.serviceLocations.length - 2} outros locais</p>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2 font-medium">Redes sociais:</p>
            <div className="flex items-center gap-2">
              {professional.socialMedia.linkedin && (
                <a
                  href={professional.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-blue-600" />
                </a>
              )}
              {professional.socialMedia.instagram && (
                <a
                  href={professional.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-pink-600" />
                </a>
              )}
              {professional.socialMedia.facebook && (
                <a
                  href={professional.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                </a>
              )}
              {!professional.socialMedia.linkedin &&
                !professional.socialMedia.instagram &&
                !professional.socialMedia.facebook && <span className="text-xs text-gray-400">Não informado</span>}
            </div>
          </div>

          <div className="mb-5">
            <p className="text-sm text-gray-500 mb-2 font-medium">Áreas de atuação:</p>
            <div className="flex flex-wrap gap-1">
              {professional.areasOfExpertise.slice(0, 3).map((area, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                  {area}
                </Badge>
              ))}
              {professional.areasOfExpertise.length > 3 && (
                <Badge variant="outline" className="text-xs text-gray-500 bg-gray-50 border-gray-200">
                  +{professional.areasOfExpertise.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsModalOpen(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Perfil
            </Button>
            {isConnected ? (
              <Button
                variant="default"
                size="sm"
                onClick={() => onMessage?.(professional.id)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onConnect?.(professional.id)}
                className="border-green-200 text-green-600 hover:bg-green-50"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal Component */}
      <ProfessionalProfileModal
        professional={professional}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isConnected={isConnected}
        onConnect={onConnect}
        onMessage={onMessage}
      />
    </>
  )
}
