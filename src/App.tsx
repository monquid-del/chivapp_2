/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen1Onboarding } from './components/screens/Screen1Onboarding';
import { Screen2SignUp } from './components/screens/Screen2SignUp';
import { Screen3PlanRide } from './components/screens/Screen3PlanRide';
import { Screen4ChooseRide } from './components/screens/Screen4ChooseRide';
import { Screen5RideDetails } from './components/screens/Screen5RideDetails';
import { Screen6DuringRide } from './components/screens/Screen6DuringRide';
import { Screen7Arrival } from './components/screens/Screen7Arrival';
import { Screen8Community } from './components/screens/Screen8Community';
import { BottomNavBar } from './components/BottomNavBar';

import { CallModal } from './components/modals/CallModal';
import { ChatModal } from './components/modals/ChatModal';
import { SOSModal } from './components/modals/SOSModal';
import { FilterModal } from './components/modals/FilterModal';
import { NotificationsModal } from './components/modals/NotificationsModal';

import { INITIAL_USER, MOCK_DRIVERS } from './data/mockData';
import { Driver, RidePlan, UserProfile } from './types';
import { ShieldCheck, Star, Award, ChevronLeft } from 'lucide-react';

export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [historyScreens, setHistoryScreens] = useState<ScreenId[]>([1]);

  // User State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Search & Ride Plan State
  const [plan, setPlan] = useState<RidePlan>({
    origin: 'Alfama, Lisbon',
    destination: 'Marquês de Pombal',
    travelTimeType: 'Now',
    preferences: {
      maxDetourMinutes: 10,
      gender: 'Any',
      quietRide: 'Preferred',
      pets: 'Okay',
    },
  });

  // Drivers
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [selectedDriver, setSelectedDriver] = useState<Driver>(MOCK_DRIVERS[0]);

  // Modals
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Bottom Tab for Screen 8 and global sub-views
  const [activeBottomTab, setActiveBottomTab] = useState('home');

  const navigateTo = (nextScreen: ScreenId) => {
    setHistoryScreens((prev) => [...prev, nextScreen]);
    setCurrentScreen(nextScreen);
  };

  const handleBack = () => {
    if (historyScreens.length > 1) {
      const nextHistory = [...historyScreens];
      nextHistory.pop(); // remove current
      const prev = nextHistory[nextHistory.length - 1];
      setHistoryScreens(nextHistory);
      setCurrentScreen(prev);
    } else {
      // Default step backs
      if (currentScreen === 2) setCurrentScreen(1);
      else if (currentScreen === 3) setCurrentScreen(2);
      else if (currentScreen === 4) setCurrentScreen(3);
      else if (currentScreen === 5) setCurrentScreen(4);
      else if (currentScreen === 6) setCurrentScreen(5);
      else if (currentScreen === 7) setCurrentScreen(6);
      else if (currentScreen === 8) setCurrentScreen(3);
    }
  };

  // Flow handlers
  const handleGetStarted = () => {
    navigateTo(2);
  };

  const handleSignUpContinue = () => {
    navigateTo(3);
  };

  const handleFindRides = () => {
    navigateTo(4);
  };

  const handleConfirmDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    navigateTo(5);
  };

  const handleConfirmAndBook = () => {
    navigateTo(6);
  };

  const handleEndRide = () => {
    navigateTo(7);
  };

  const handleCompleteFeedback = (rating: number, compliments: string[]) => {
    // Award +30 points, +1.8 kg CO2, +1 ride
    setUser((prev) => ({
      ...prev,
      points: prev.points + 30,
      co2SavedKg: prev.co2SavedKg + 1.8,
      ridesThisMonth: prev.ridesThisMonth + 1,
    }));
    setActiveBottomTab('home');
    navigateTo(8);
  };

  const handleBottomTabSelect = (tab: string) => {
    setActiveBottomTab(tab);
    if (tab === 'rides') {
      navigateTo(3);
    } else if (tab === 'home') {
      navigateTo(8);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-[#FAF9F5] text-slate-800 flex justify-center select-none font-sans">
      {/* Mobile-Native Viewport Container */}
      <div className="w-full max-w-md min-h-dvh bg-[#FAF9F5] flex flex-col relative overflow-hidden shadow-none md:shadow-xl md:border-x md:border-slate-200">
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {/* SCREEN 1: Welcome & Onboarding */}
          {currentScreen === 1 && (
            <Screen1Onboarding onGetStarted={handleGetStarted} />
          )}

          {/* SCREEN 2: Sign Up & Verify Identity */}
          {currentScreen === 2 && (
            <Screen2SignUp
              user={user}
              onBack={handleBack}
              onContinue={handleSignUpContinue}
              onUpdateUser={(up) => setUser((prev) => ({ ...prev, ...up }))}
            />
          )}

          {/* SCREEN 3: Plan Your Ride */}
          {currentScreen === 3 && (
            <Screen3PlanRide
              plan={plan}
              onUpdatePlan={(p) => setPlan((prev) => ({ ...prev, ...p }))}
              onBack={handleBack}
              onFindRides={handleFindRides}
            />
          )}

          {/* SCREEN 4: Choose Your Ride */}
          {currentScreen === 4 && (
            <Screen4ChooseRide
              drivers={drivers}
              selectedDriver={selectedDriver}
              plan={plan}
              onSelectDriver={(d) => setSelectedDriver(d)}
              onConfirmDriver={handleConfirmDriver}
              onBack={handleBack}
              onOpenFilter={() => setIsFilterOpen(true)}
            />
          )}

          {/* SCREEN 5: Ride Details & Confirm */}
          {currentScreen === 5 && (
            <Screen5RideDetails
              driver={selectedDriver}
              onBack={handleBack}
              onConfirmAndBook={handleConfirmAndBook}
            />
          )}

          {/* SCREEN 6: During the Ride (Live GPS Sim) */}
          {currentScreen === 6 && (
            <Screen6DuringRide
              driver={selectedDriver}
              onEndRide={handleEndRide}
              onOpenCall={() => setIsCallOpen(true)}
              onOpenChat={() => setIsChatOpen(true)}
              onOpenSOS={() => setIsSOSOpen(true)}
            />
          )}

          {/* SCREEN 7: Arrive at Destination & Rating */}
          {currentScreen === 7 && (
            <Screen7Arrival onCompleteFeedback={handleCompleteFeedback} />
          )}

          {/* SCREEN 8: Community & Rewards Dashboard */}
          {currentScreen === 8 && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {activeBottomTab === 'home' && (
                <Screen8Community
                  user={user}
                  onOpenNotifications={() => setIsNotificationsOpen(true)}
                  onStartNewRide={() => navigateTo(3)}
                  onSelectTab={handleBottomTabSelect}
                  activeTab={activeBottomTab}
                />
              )}

              {/* Subview: Community Groups */}
              {activeBottomTab === 'community' && (
                <div className="flex flex-col h-full bg-[#FAF9F5] p-5 overflow-y-auto no-scrollbar">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => setActiveBottomTab('home')}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Lisbon Carpool Clubs</h2>
                      <p className="text-[11px] text-slate-500">Connect with daily commuters in your neighborhood</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Alfama & Graça Morning Commute', members: 142, trips: 'Daily at 8:30 AM', color: 'bg-emerald-100 text-emerald-800' },
                      { name: 'Baixa Tech Hub Carpools', members: 215, trips: 'Flexible 8:00 - 10:00 AM', color: 'bg-blue-100 text-blue-800' },
                      { name: 'Parque das Nações Green Commuters', members: 98, trips: 'Daily at 8:45 AM', color: 'bg-amber-100 text-amber-800' },
                      { name: 'Saldanha Weekend Explorers', members: 64, trips: 'Saturdays & Sundays', color: 'bg-purple-100 text-purple-800' },
                    ].map((club) => (
                      <div key={club.name} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${club.color}`}>
                            {club.members} active members
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer">
                            Join Club
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-1.5">{club.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{club.trips}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveBottomTab('home')}
                    className="mt-6 py-2.5 rounded-xl bg-slate-200 text-xs font-semibold text-slate-700 active:scale-98 transition"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}

              {/* Subview: Rewards History */}
              {activeBottomTab === 'rewards' && (
                <div className="flex flex-col h-full bg-[#FAF9F5] p-5 overflow-y-auto no-scrollbar">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => setActiveBottomTab('home')}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Your Rewards Ledger</h2>
                      <p className="text-[11px] text-slate-500">Points earned from carpooling in Lisbon</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-amber-800">Available Balance</p>
                      <p className="text-2xl font-black text-amber-950 mt-0.5">{user.points} pts</p>
                    </div>
                    <Award className="w-8 h-8 text-amber-600" />
                  </div>

                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide mt-4">Recent Activity</h3>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">Carpool with Rafael S.</p>
                        <p className="text-[10px] text-slate-500">Alfama → Marquês de Pombal</p>
                      </div>
                      <span className="font-bold text-emerald-700">+30 pts</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">Community Onboarding</p>
                        <p className="text-[10px] text-slate-500">Identity verification complete</p>
                      </div>
                      <span className="font-bold text-emerald-700">+100 pts</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">Green Commuter Bonus</p>
                        <p className="text-[10px] text-slate-500">10 carpools completed milestone</p>
                      </div>
                      <span className="font-bold text-emerald-700">+190 pts</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveBottomTab('home')}
                    className="mt-6 py-2.5 rounded-xl bg-slate-200 text-xs font-semibold text-slate-700 active:scale-98 transition"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}

              {/* Subview: Profile */}
              {activeBottomTab === 'profile' && (
                <div className="flex flex-col h-full bg-[#FAF9F5] p-5 overflow-y-auto no-scrollbar">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => setActiveBottomTab('home')}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <h2 className="text-base font-bold text-slate-900">Profile & Verification</h2>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#154331]"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Rider & Driver
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Phone</span>
                      <span className="font-medium text-slate-900">{user.phone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Lisbon Home District</span>
                      <span className="font-medium text-slate-900">Alfama, Lisbon</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Community Safety Rating</span>
                      <span className="font-bold text-amber-600 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> 5.0 (28 ratings)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveBottomTab('home')}
                    className="mt-6 py-2.5 rounded-xl bg-slate-200 text-xs font-semibold text-slate-700 active:scale-98 transition"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}

              {/* Bottom Navigation Bar */}
              <BottomNavBar
                activeTab={activeBottomTab}
                onSelectTab={handleBottomTabSelect}
              />
            </div>
          )}

          {/* Overlays / Modals */}
          {isCallOpen && (
            <CallModal
              driver={selectedDriver}
              onClose={() => setIsCallOpen(false)}
            />
          )}

          {isChatOpen && (
            <ChatModal
              driver={selectedDriver}
              onClose={() => setIsChatOpen(false)}
            />
          )}

          {isSOSOpen && (
            <SOSModal
              driver={selectedDriver}
              onClose={() => setIsSOSOpen(false)}
            />
          )}

          {isFilterOpen && (
            <FilterModal
              onClose={() => setIsFilterOpen(false)}
              onApply={() => setIsFilterOpen(false)}
            />
          )}

          {isNotificationsOpen && (
            <NotificationsModal
              onClose={() => setIsNotificationsOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
