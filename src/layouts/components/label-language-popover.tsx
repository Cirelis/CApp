import type { IconButtonProps } from '@mui/material/IconButton';
import type { LangCode } from 'src/locales';

import { m } from 'framer-motion';
import { useCallback, useState } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { allLangs, useTranslate } from 'src/locales';
import { FlagIcon } from 'src/components/flag-icon';
import { CustomPopover } from 'src/components/custom-popover';
import { varTap, varHover, transitionTap } from 'src/components/animate';

// ----------------------------------------------------------------------

type Props = IconButtonProps & {
  preview?: boolean;
  langIndex: number;
  changeLang: (newLang: string) => void;
};

export function LabelLanguagePopover({ preview, langIndex, changeLang, sx, ...other }: Props) {
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const { onChangeLang, currentLang } = useTranslate();

  const [currentIcon, setCurrentIcon] = useState<string>('');
  const locales = useTranslate();

  const handleChangeLang = useCallback(
    (newLang: string) => {
      const selectedLang = allLangs.find((lang) => lang.value === newLang);
      if (selectedLang && !preview) {
        setCurrentIcon(selectedLang.icon);
        changeLang(newLang);
        onClose();
      }
    },
    [locales, preview, onClose, changeLang]
  );

  const renderMenuList = () => (
    <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose}>
      <MenuList sx={{ width: 160, minHeight: 72 }}>
        {allLangs?.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang.value}
            onClick={() => handleChangeLang(option.value as LangCode)}
          >
            <FlagIcon code={option.countryCode} />
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Languages button"
        onClick={onOpen}
        sx={[
          (theme) => ({
            p: 0,
            width: 40,
            height: 40,
            ...(open && { bgcolor: theme.vars.palette.action.selected }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <FlagIcon code={currentLang.countryCode} />
      </IconButton>

      {renderMenuList()}
    </>
  );
}
