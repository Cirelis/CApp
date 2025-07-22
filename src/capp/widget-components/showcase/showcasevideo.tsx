import { Card, Box, Button, useTheme } from '@mui/material';
import { useDesign } from 'src/hooks/use-design';
import { useTranslate } from 'src/locales';
import { spacing } from 'src/styleguide';
import { IDesign, IWidget } from 'src/types/product';

type Props = {
  widget: IWidget;
  langIndex: number;
  preview?: boolean;
};

export default function ShowcaseVideo({ widget, langIndex, preview }: Props) {
  const { t } = useTranslate();
  const design = useDesign();

  const embedId =
    widget?.childs?.[0]?.attributes?.YoutubeEmbedID?.value?.[langIndex]?.val?.[0] || '';

  if (!embedId) {
    return (
      <Card sx={{ p: spacing.containerPadding[design.style.general.spacing] }}>
        <p>{t('labelEditor.components.videoError')}</p>
      </Card>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${embedId}`;

  return (
    <Card
      sx={{
        p: spacing.containerPadding[design.style.general.spacing],
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '335px',
          height: '250px',
          background: `url(${thumbnailUrl}) center/cover no-repeat`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => !preview && window.open(youtubeUrl, '_blank')}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            fontSize: '1.2rem',
            padding: '10px 20px',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
            },
          }}
        >
          ▶ Play
        </Button>
      </Box>
    </Card>
  );
}
