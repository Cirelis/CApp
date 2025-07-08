import { useCallback } from 'react';
import { m } from 'framer-motion';
// @mui

import MenuItem from '@mui/material/MenuItem';

// locales
import { allLangs, getCurrentLang, useTranslate } from 'src/locales';
// components
import {Iconify} from 'src/components/iconify';

import { CustomPopover } from 'src/components/custom-popover';

import { IconButton } from '@mui/material';
import i18next from 'i18next';
import { usePopover } from 'minimal-shared/hooks';

// ----------------------------------------------------------------------

export default function LanguageSelect() {
  const { onChangeLang } = useTranslate();
  const currentLang = getCurrentLang(i18next.resolvedLanguage);

  const { open, anchorEl, onClose, onOpen } = usePopover();

  const handleChangeLang = useCallback(
    (newLang: string) => {
      onChangeLang(newLang as "en" | "de" | "fr" | "vi" | "cn" | "ar");
      onClose();
    },
    []
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        onClick={onOpen}
        sx={{
          width: 36,
          height: 36,
          padding: 1,
        }}
      >
        <Iconify icon={currentLang.icon} sx={{ width: 'auto' }} />
      </IconButton>

      <CustomPopover anchorEl={anchorEl} open={open} onClose={onClose} sx={{ width: 160 }}>
        {allLangs
          .filter((option) => option.value === 'en' || option.value === 'de')
          .map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => handleChangeLang(option.value)}
            >
              <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />
              {option.label}
            </MenuItem>
          ))}
      </CustomPopover>
    </>
  );
}
