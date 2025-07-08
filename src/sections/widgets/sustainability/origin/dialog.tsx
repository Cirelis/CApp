import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Iconify } from 'src/components/iconify';
import CButton from 'src/sections/custom-components/c-button';
import CHeading from 'src/sections/custom-components/c-heading';
import CLabel from 'src/sections/custom-components/c-label';
import CPara from 'src/sections/custom-components/c-para';
import { IDesign } from 'src/types/product';
import { IOriginLocation } from 'src/types/origin';
import { spacing } from 'src/styleguide';

type Props = {
  design: IDesign;
  buttonText: string;
  dialogDatas?: IOriginLocation[];
  preview?: boolean;
  countryCode: string;
};

export default function LocationDialog({
  design,
  preview,
  buttonText,
  dialogDatas,
  countryCode,
}: Props) {
  const theme = useTheme();
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.primary.main;
  const backgroundColor = design.style.colors.backgroundColor;
  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || primaryColor;
  const buttonTextColor = design.style.buttons.textColor || secondaryColor;

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleMapsClicked = (url: string) => {
    handleCloseDialog();

    window.open(url, '_blank');
  };

  const handleWebClicked = (url: string) => {
    handleCloseDialog();

    window.open(url, '_blank');
  };

  return (
    <>
      <Stack>
        <Button onClick={handleOpenDialog} sx={{ p: 0 }}>
          <CLabel
            color={colorLabel}
            textColor={colorTextLabel}
            font={fontLabel}
            fontWeight={weightLabel}
            size={sizePara}
          >
            <Stack direction="row" spacing={spacing.inlineSpacing[design.style.general.spacing]} alignItems="center">
              <Iconify icon={`flagpack:${countryCode.toLocaleLowerCase()}`} />
              {buttonText}
              {dialogDatas && <Iconify icon="mdi:information-slab-circle-outline" />}
            </Stack>
          </CLabel>
        </Button>
        {dialogDatas && dialogDatas.length > 0 && (
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            PaperProps={{ sx: { borderRadius: design.style.cards.borderradius * 2 } }}
          >
            <DialogTitle sx={{ p: spacing.containerPadding[design.style.general.spacing], backgroundColor }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <CHeading
                  value={buttonText}
                  fontHeadlines={fontHeadlines}
                  colorHeadlines={colorHeadlines}
                  variant="h2"
                  size={sizeHeadlines}
                  fontWeight={weightHeadlines}
                />
                <IconButton onClick={handleCloseDialog}>
                  <Iconify
                    icon="mdi:close-circle"
                    width={30}
                    sx={{
                      color: buttonColor,
                    }}
                  />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent
              sx={{
                backgroundColor,
                minWidth: '350px',
                p: spacing.containerPadding[design.style.general.spacing],
              }}
            >
              <Stack
                spacing={spacing.contentSpacingS[design.style.general.spacing]}
                divider={<Divider sx={{ borderStyle: 'dashed' }} />}
              >
                {dialogDatas.map((dialogData) => (
                  <Stack key={dialogData.id} spacing={spacing.contentSpacingS[design.style.general.spacing]}>
                    <Stack direction="row" alignItems="center" spacing={spacing.inlineSpacing[design.style.general.spacing]}>
                      <CLabel
                        color={colorLabel}
                        textColor={colorTextLabel}
                        font={fontLabel}
                        fontWeight={weightLabel}
                        size="small"
                      >
                        <Iconify
                          icon={`flagpack:${countryCode.toLocaleLowerCase()}`}
                          sx={{ mt: 0.3, mr: 0.5 }}
                        />
                        {dialogData.city}
                      </CLabel>
                      {dialogData.dialogTitle && (
                        <CHeading
                          value={dialogData.dialogTitle}
                          fontHeadlines={fontHeadlines}
                          colorHeadlines={colorHeadlines}
                          variant="h3"
                          size={sizeHeadlines}
                          fontWeight={weightHeadlines}
                        />
                      )}
                    </Stack>
                    {dialogData.dialogContent && (
                      <CPara
                        value={dialogData.dialogContent}
                        font={fontPara}
                        color={colorPara}
                        size={sizePara}
                        fontWeight={weightPara}
                      />
                    )}
                    {(dialogData.mapsUrl || dialogData.webUrl) && (
                      <Stack direction="row" spacing={spacing.inlineSpacing[design.style.general.spacing]}>
                        {dialogData.mapsUrl && (
                          <CButton
                            variant={buttonStyle}
                            buttonColor={buttonColor}
                            textColor={buttonTextColor}
                            size="small"
                            onClick={() => handleMapsClicked(dialogData.mapsUrl!)}
                          >
                            <Stack direction="row" alignItems="center">
                              <Typography>Google Maps</Typography>
                              <Iconify icon="mdi:arrow-top-right" />
                            </Stack>
                          </CButton>
                        )}
                        {dialogData.webUrl && (
                          <CButton
                            variant={buttonStyle}
                            buttonColor={buttonColor}
                            textColor={buttonTextColor}
                            size="small"
                            onClick={() => handleWebClicked(dialogData.webUrl!)}
                          >
                            <Stack direction="row" alignItems="center">
                              <Typography>Webeite</Typography>
                              <Iconify icon="mdi:arrow-top-right" />
                            </Stack>
                          </CButton>
                        )}
                      </Stack>
                    )}
                  </Stack>
                ))}
              </Stack>
            </DialogContent>
          </Dialog>
        )}
      </Stack>
    </>
  );
}
