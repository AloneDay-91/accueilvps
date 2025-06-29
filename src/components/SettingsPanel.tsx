import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon } from 'lucide-react';
import { settingsService, Settings } from '@/services/settingsService';
import { useProgressToast } from '@/contexts/ProgressToastContext';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/contexts/SettingsContext';

export const SettingsPanel: React.FC = () => {
  const { settings, loading, updateSettings } = useSettings();
  const { success, error: showError } = useProgressToast();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card title="Paramètres">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <SettingsIcon className="w-4 h-4" />
          <h2 className="text-md font-md">Paramètres</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-normal text-sm">Modal de publicité</h3>
            <p className="text-xs text-muted-foreground">
              Afficher ou masquer la modal de publicité en bas à droite
            </p>
          </div>

          <div className='flex flex-row gap-2 items-center'>
          <Switch
            checked={!!settings?.showPubModal}
            onCheckedChange={async (checked) => {
              try {
                await updateSettings({ showPubModal: checked });
                success(checked ? 'Modal de pub activée' : 'Modal de pub désactivée');
              } catch (err) {
                showError('Erreur lors de la mise à jour des paramètres');
              }
            }}
            disabled={loading}
          />
          <span className="ml-2 text-xs">
            {settings?.showPubModal ? 'Activée' : 'Désactivée'}
          </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 