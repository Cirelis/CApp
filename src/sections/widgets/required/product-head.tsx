import { Avatar, Box, Card, Stack, Typography, useTheme } from '@mui/material';
import { IWidget } from 'src/types/product';
import { Image } from 'src/components/image';

import { useEffect, useState } from 'react';
import CHeading from 'src/sections/custom-components/c-heading';
import CLabel from 'src/sections/custom-components/c-label';
import { useDesign } from 'src/hooks/use-design';
import { spacing } from 'src/styleguide';
import { LabelLanguagePopover } from 'src/layouts/components/label-language-popover';

type Props = {
  widget: IWidget;
  langIndex: number;
  preview: boolean;
  handleChangeLang: (newLang: string) => void;
};

export default function ProductHead({ widget, langIndex, preview, handleChangeLang }: Props) {
  const theme = useTheme();
  const design = useDesign();
  // Content
  const attributes = widget.childs[0].attributes;
  const brandName = attributes.ProductHeadBrandName.value[langIndex]?.val[0];
  const productName = attributes.ProductHeadProductName.value[langIndex]?.val[0];
  const showTags = attributes.ShowProductTags.value[langIndex]?.val[0];
  const tags = attributes.ProductHeadProductTags.value[langIndex]?.val;
  const productPic = attributes.ProductPicture.value[langIndex]?.val[0];
  const productBanner = attributes.ProductBanner.value[langIndex]?.val[0];
  const showProduct = attributes.ShowProduct.value[langIndex]?.val[0];
  const showBanner = attributes.ShowBanner.value[langIndex]?.val[0];

  // Style
  const colorBackground = design.style.colors.backgroundColor || '#ffffff';
  const orientation = widget.style?.Orientation?.value[0];
  const productShape = widget.style.ProductShape.value[0];
  const productPicSize = widget.style.ProductSize.value[0];
  const bannerShape = widget.style.BannerShape.value[0];
  const bannerSize = widget.style.BannerSize.value[0];
  const productNameSize = widget.style.NameSize.value[0];
  const widgetHeadlineColor = widget.style.NameColor.value[0];

  // Design
  const colorHeadlines =
    widgetHeadlineColor || design.typography.headlines.color || theme.palette.text.primary;

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const sizeHeadlines = design.typography.headlines.size;

  const fontLabel = design.typography.tags.font;
  const weightLabel = design.typography.tags.weight as 'regular' | 'bold';
  const colorLabel = design.typography.tags.tagColor || theme.palette.action.disabledBackground;
  const colorTextLabel = design.typography.tags.color || theme.palette.grey[600];
  const sizePara = design.typography.paragraphs.size;

  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;

  const [productShapeRadius, setProductShapeRadius] = useState(0);
  const [productPictureSize, setProductPictureSize] = useState(128);
  const [bannerShapeRadius, setBannerShapeRadius] = useState(0);

  useEffect(() => {
    if (productShape === 'square') {
      setProductShapeRadius(0);
    } else if (productShape === 'round') {
      setProductShapeRadius(2);
    } else if (productShape === 'circle') {
      setProductShapeRadius(10);
    }

    if (productPicSize === 's') {
      setProductPictureSize(80);
    } else if (productPicSize === 'm') {
      setProductPictureSize(100);
    } else if (productPicSize === 'l') {
      setProductPictureSize(128);
    }

    if (bannerShape === 'square') {
      setBannerShapeRadius(0);
    } else if (bannerShape === 'round') {
      setBannerShapeRadius(1);
    }
  }, [productShape, productPicSize, bannerShape]);

  return (
    <Stack>
      {showBanner === 'X' ? (
        <Box sx={{ position: 'relative' }}>
          <Card
            sx={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1, borderRadius: '50%' }}
          >
            <LabelLanguagePopover
              preview={preview}
              langIndex={langIndex}
              changeLang={handleChangeLang}
            />
          </Card>
          <Image
            src={productBanner}
            ratio={bannerSize as `${number}/${number}` | undefined}
            sx={{
              borderRadius: `${bannerShapeRadius * 8}px`,
              borderColor: colorBackground,
            }}
          />
        </Box>
      ) : (
        <Box sx={{ position: 'relative', mt: 10 }}>
          <Card sx={{ position: 'absolute', top: 3, right: 3, zIndex: 1, mt: -10 }}>
            <LabelLanguagePopover
              preview={preview}
              langIndex={langIndex}
              changeLang={handleChangeLang}
            />
          </Card>
        </Box>
      )}
      <Stack
        sx={{
          mx: spacing.containerPadding[design.style.general.spacing],
          textAlign: orientation,
          alignItems: orientation,
        }}
        spacing={spacing.contentSpacingS[design.style.general.spacing]}
      >
        {showProduct === 'X' && (
          <Avatar
            src={productPic}
            sx={{
              alignItems: 'center',
              width: productPictureSize,
              height: productPictureSize,
              zIndex: 11,
              mt: '-64px',
              borderRadius: productShapeRadius,
              border: `3px solid ${colorBackground}`,
            }}
          />
        )}
        <Box sx={{ opacity: 0.6, alignItems: orientation }}>
          <CHeading
            value={brandName}
            fontHeadlines={fontHeadlines}
            colorHeadlines={colorHeadlines}
            variant="h4"
            size={productNameSize || sizeHeadlines}
            orientation={orientation}
            fontWeight={weightHeadlines}
          />
        </Box>
        <CHeading
          value={productName}
          fontHeadlines={fontHeadlines}
          colorHeadlines={colorHeadlines}
          variant="h1"
          size={productNameSize || sizeHeadlines}
          orientation={orientation}
          fontWeight={weightHeadlines}
        />
        <Stack spacing={spacing.spacingTags[design.style.general.spacing]} direction="row">
          {showTags === 'X' && (
            <>
              {tags.map((tag: string) => (
                <CLabel
                  key={tag}
                  value={tag}
                  color={colorLabel}
                  textColor={colorTextLabel}
                  font={fontLabel}
                  fontWeight={weightLabel}
                  size={sizePara}
                />
              ))}
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
