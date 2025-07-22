import { Button, Stack, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDesign } from 'src/hooks/use-design';
import { IWidget } from 'src/types/product';
import { ProductInformationIcon } from 'src/assets/icons/custom';
import { Iconify } from 'src/components/iconify';

type Props = {
  widget: IWidget;
  langIndex: number;
  preview: boolean;
};

export default function Document({ widget, langIndex, preview }: Props) {
  const theme = useTheme();
  const design = useDesign();
  const docName = widget.childs[0].attributes.DocumentName;
  const docPath = widget.childs[0].attributes.DocumentPath;

  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;

  const handleDownloadAll = () => {
    if (!preview) {
      // Ensure URL and Name are available
      if (docPath.value && docPath.value[langIndex].val[0]) {
        const url = docPath.value[langIndex].val[0];
        // Open each document in a new tab/window
        window.open(url, '_blank');
      }
    }
  };

  return (
    <Stack>
      <Button onClick={handleDownloadAll}>
        <Iconify
          icon="mdi:download"
          width={24}
          sx={{
            color: primaryColor,
            mr: 1,
          }}
        />
        {` Download ${docName.value[langIndex].val[0]}`}
      </Button>
    </Stack>
  );
}
