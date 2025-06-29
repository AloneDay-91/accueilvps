"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsService, Settings } from '@/services/settingsService';

interface SettingsContextType {
  settings: Settings | null;
  loading: boolean;
  updateSettings: (data: Partial<Settings>) => Promise<void>;
  togglePubModal: () => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (data: Partial<Settings>) => {
    try {
      const updatedSettings = await settingsService.updateSettings(data);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres:', error);
      throw error;
    }
  };

  const togglePubModal = async () => {
    try {
      const updatedSettings = await settingsService.togglePubModal();
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erreur lors du basculement de la modal de pub:', error);
      throw error;
    }
  };

  const refreshSettings = async () => {
    await loadSettings();
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{
      settings,
      loading,
      updateSettings,
      togglePubModal,
      refreshSettings,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 