import { useState } from 'react'
import { cn } from '../utils'
import { User, MapPin, Clock, Check, Star, Shield } from 'lucide-react'
import { SPORTS_DATA } from '../constants/data'
import { useTranslation } from '../hooks/use-translation'

const LOCATIONS = [
  { id: 'hanoi', name: 'Hà Nội', country: 'Vietnam' },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', country: 'Vietnam' },
  { id: 'danang', name: 'Đà Nẵng', country: 'Vietnam' },
  { id: 'cantho', name: 'Cần Thơ', country: 'Vietnam' }
]

const TIMEZONES = [
  { id: 'utc+7', name: 'UTC+7 (Vietnam Time)', offset: '+7' },
  { id: 'utc+8', name: 'UTC+8 (Singapore Time)', offset: '+8' },
  { id: 'utc+9', name: 'UTC+9 (Japan Time)', offset: '+9' }
]

type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'

export function ProfileSetupPage() {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState({
    fullName: '',
    location: '',
    timezone: 'utc+7',
    preferredSports: [] as string[],
    experience: 'beginner' as ExperienceLevel
  })

  const totalSteps = 4

  const handleSportToggle = (sportId: string) => {
    setProfile((prev) => ({
      ...prev,
      preferredSports: prev.preferredSports.includes(sportId)
        ? prev.preferredSports.filter((id) => id !== sportId)
        : [...prev.preferredSports, sportId]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-slate-400">Let's set up your account for the best tournament experience</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-slate-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Experience Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'beginner', label: 'Beginner', icon: Star, desc: 'Just starting out' },
                    { id: 'intermediate', label: 'Intermediate', icon: Shield, desc: 'Some experience' },
                    { id: 'advanced', label: 'Advanced', icon: Check, desc: 'Very experienced' }
                  ].map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setProfile((prev) => ({ ...prev, experience: level.id as ExperienceLevel }))}
                      className={cn(
                        'p-4 rounded-xl border transition-all duration-200 text-center',
                        profile.experience === level.id
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500'
                      )}
                    >
                      <level.icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-slate-400">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Location & Timezone</h2>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {LOCATIONS.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setProfile((prev) => ({ ...prev, location: location.id }))}
                      className={cn(
                        'p-4 rounded-xl border transition-all duration-200 text-left',
                        profile.location === location.id
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500'
                      )}
                    >
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs text-slate-400">{location.country}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Timezone
                </label>
                <div className="space-y-2">
                  {TIMEZONES.map((tz) => (
                    <button
                      key={tz.id}
                      onClick={() => setProfile((prev) => ({ ...prev, timezone: tz.id }))}
                      className={cn(
                        'w-full p-3 rounded-xl border transition-all duration-200 text-left',
                        profile.timezone === tz.id
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500'
                      )}
                    >
                      {tz.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Sports Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Preferred Sports</h2>
              <p className="text-slate-400 mb-6">Choose the sports you're interested in (select multiple)</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SPORTS_DATA.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => handleSportToggle(sport.id)}
                    className={cn(
                      'p-4 rounded-xl border transition-all duration-200 text-center',
                      profile.preferredSports.includes(sport.id)
                        ? 'border-blue-500 bg-blue-500/10 text-white scale-105'
                        : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500 hover:scale-105'
                    )}
                  >
                    <div className="text-2xl mb-2">{sport.icon}</div>
                    <div className="font-medium">{t(`home.sports.${sport.id}.title`)}</div>
                    {profile.preferredSports.includes(sport.id) && (
                      <Check className="w-5 h-5 text-green-400 mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Review Your Profile</h2>

              <div className="space-y-4">
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h3 className="font-medium text-white mb-2">Basic Information</h3>
                  <p className="text-slate-300">Name: {profile.fullName || 'Not set'}</p>
                  <p className="text-slate-300">Experience: {profile.experience}</p>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h3 className="font-medium text-white mb-2">Location & Time</h3>
                  <p className="text-slate-300">
                    Location: {LOCATIONS.find((l) => l.id === profile.location)?.name || 'Not set'}
                  </p>
                  <p className="text-slate-300">Timezone: {TIMEZONES.find((t) => t.id === profile.timezone)?.name}</p>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h3 className="font-medium text-white mb-2">Preferred Sports ({profile.preferredSports.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredSports.map((sportId) => {
                      const sport = SPORTS_DATA.find((s) => s.id === sportId)
                      return sport ? (
                        <span key={sportId} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          {sport.icon} {t(`home.sports.${sport.id}.title`)}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                'px-6 py-3 rounded-xl font-medium transition-all duration-200',
                currentStep === 1
                  ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              )}
            >
              Previous
            </button>

            <button
              onClick={currentStep === totalSteps ? () => alert('Profile setup complete!') : nextStep}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
            >
              {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
