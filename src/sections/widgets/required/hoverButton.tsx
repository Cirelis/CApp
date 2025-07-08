import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useRef, useState } from 'react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { IDesign, IWidget } from 'src/types/product';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useProductId } from 'src/hooks/use-product-id';

type Props = {
  preview?: boolean;
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  tags?: string[] | undefined;
  analytics?: boolean;
};

export default function HoverButton({
  preview,
  design,
  widget,
  langIndex,
  tags,
  analytics,
}: Props) {
  const theme = useTheme();
  const companyId = useCompanyId();
  const productId = useProductId();
  const [showButtons, setShowButtons] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Matomo
  const { trackEvent } = useMatomo();
  const trackId = `${companyId}/${productId}/${tags?.sort().join('/')}`;
  const sessionTrackerRef = useRef<SessionTrackerHandle>(null); // Apply the ref type here
  const matomoPath = `widget/${widget.label.id}/null/${companyId}/${productId}/${tags?.sort().join('/')}`;
  const sessiontrackId = `widget/${widget.label.id}/null/${productId}`;

  // Content
  const attributes = widget.childs[0].attributes;
  const xTop = attributes.GoToTop.value[langIndex]?.val[0];
  const xMail = attributes.ShowContactMail.value[langIndex]?.val[0];
  const xRebuy = attributes.ShowRebuy.value[langIndex]?.val[0];
  const email = attributes.ContactMail.value[langIndex]?.val[0];
  const shopURL = attributes.HoverButtonProductURL.value[langIndex]?.val[0];
  const discountCode = attributes.DiscountCode.value[langIndex]?.val[0];
  const discountDesc = attributes.DiscountCodeDescription.value[langIndex]?.val[0];
  // Style
  const showHover = widget.style.ShowHover.value[0];
  const buttonColor = design.style.buttons.buttonColor || theme.palette.primary.main;
  const backgroundColor = design.style.colors.backgroundColor;
  const dynamicPrimaryText = design.style.cards.color;

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleEmailClick = () => {
    if (!preview) {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleScrollToTop = () => {
    if (!preview) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRebuy = () => {
    if (!preview) {
      setDialogOpen(true);
      sessionTrackerRef.current?.startSession();
      trackEvent({ category: trackId, action: 'rebuy', value: 1 });
    }
  };

  const handleCancelDialog = () => {
    setDialogOpen(false);
    sessionTrackerRef.current?.endSession();
  };

  const copyLink = () => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
    }
  };

  const handleConfirmRebuy = async () => {
    if (!preview) {
      // Ensure shopURL is used as an absolute URL
      const absoluteShopURL =
        shopURL.startsWith('http://') || shopURL.startsWith('https://')
          ? shopURL
          : `https://${shopURL}`;
      window.location.assign(absoluteShopURL); // Use assign for a direct navigation
    }
    setDialogOpen(false);
    sessionTrackerRef.current?.endSession();
  };

  const showToggleButton = xTop === 'X' || xMail === 'X' || xRebuy === 'X';

  let singleButton = null;
  if ([xTop, xMail, xRebuy].filter((x) => x === 'X').length === 1) {
    if (xTop === 'X') {
      singleButton = (
        <Button
          onClick={handleScrollToTop}
          sx={{
            ml: showButtons ? 1 : 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack alignItems="center" direction="row">
            <Box>
              <Avatar
                src=""
                alt=""
                sx={{
                  width: 46,
                  height: 46,
                  backgroundColor: buttonColor,
                  color: dynamicPrimaryText,
                }}
              >
                <Iconify icon="mdi:chevron-up" />
              </Avatar>
            </Box>
          </Stack>
        </Button>
      );
    } else if (xMail === 'X') {
      singleButton = (
        <Button
          onClick={handleEmailClick}
          sx={{
            ml: showButtons ? 1 : 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack alignItems="center" direction="row">
            <Box>
              <Avatar
                src=""
                alt=""
                sx={{
                  width: 46,
                  height: 46,
                  backgroundColor: buttonColor,
                  color: dynamicPrimaryText,
                }}
              >
                <Iconify icon="mdi:email-outline" />
              </Avatar>
            </Box>
          </Stack>
        </Button>
      );
    } else if (xRebuy === 'X') {
      singleButton = (
        <Button
          onClick={handleRebuy}
          sx={{
            ml: showButtons ? 1 : 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack alignItems="center" direction="row">
            <Box>
              <Avatar
                src=""
                alt=""
                sx={{
                  width: 46,
                  height: 46,
                  backgroundColor: buttonColor,
                  color: dynamicPrimaryText,
                }}
              >
                <Iconify icon="mdi:cart-plus" />
              </Avatar>
            </Box>
          </Stack>
        </Button>
      );
    }
  } else {
    singleButton = (
      <Button
        onClick={toggleButtons}
        sx={{
          ml: showButtons ? 1 : 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack alignItems="center" direction="row">
          <Box>
            <Avatar
              src=""
              alt=""
              sx={{
                width: 46,
                height: 46,
                backgroundColor: buttonColor,
                color: dynamicPrimaryText,
              }}
            >
              {showButtons ? (
                <Iconify icon="mdi:close" />
              ) : (
                <Iconify icon="vaadin:ellipsis-dots-v" />
              )}
            </Avatar>
          </Box>
        </Stack>
      </Button>
    );
  }

  return (
    <>
      {analytics && (
        <SessionTracker
          ref={sessionTrackerRef}
          matomoPath={matomoPath}
          trackId={sessiontrackId}
          onSessionEnd={(time) => ({})}
          onSessionTimeUpdate={(time) => ({})}
        />
      )}
      {showHover === 'X' && (
        <Box sx={{ m: 0 }}>
          <Box display="flex" alignItems="center" sx={{ m: 0 }}>
            {showButtons && (
              <Stack direction="row">
                <ButtonGroup
                  variant="contained"
                  sx={{
                    height: 50,
                    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                      borderColor: dynamicPrimaryText, // Set the border color
                    },
                    '& .MuiButtonGroup-grouped': {
                      borderWidth: 0.5, // Optional: Adjust border thickness
                    },
                  }}
                >
                  {xRebuy === 'X' && (
                    <Button
                      onClick={handleRebuy}
                      sx={{
                        backgroundColor: buttonColor,
                        color: dynamicPrimaryText,
                        borderRadius: 4,
                        width: 50,
                        '&:hover': {
                          backgroundColor: buttonColor,
                        },
                      }}
                    >
                      <Iconify icon="mdi:cart-plus" />
                    </Button>
                  )}
                  {xMail === 'X' && (
                    <Button
                      onClick={handleEmailClick}
                      sx={{
                        backgroundColor: buttonColor,
                        color: dynamicPrimaryText,
                        borderRadius: 4,
                        width: 50,
                        '&:hover': {
                          backgroundColor: buttonColor,
                        },
                      }}
                    >
                      <Iconify icon="mdi:email-outline" />
                    </Button>
                  )}
                  {xTop === 'X' && (
                    <Button
                      onClick={handleScrollToTop}
                      sx={{
                        backgroundColor: buttonColor,
                        color: dynamicPrimaryText,
                        borderRadius: 4,
                        width: 50,
                        '&:hover': {
                          backgroundColor: buttonColor,
                        },
                      }}
                    >
                      <Iconify icon="mdi:chevron-up" />
                    </Button>
                  )}
                </ButtonGroup>
              </Stack>
            )}
            {showToggleButton && singleButton}
          </Box>
          <Dialog open={dialogOpen} onClose={handleCancelDialog}>
            <DialogTitle
              sx={{
                backgroundColor,
              }}
            >
              {' '}
            </DialogTitle>
            <DialogContent
              sx={{
                backgroundColor,
              }}
            >
              <Typography>{discountDesc}</Typography>
              <Stack display="flex" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Typography
                    sx={{
                      mt: 3,
                    }}
                  >
                    {discountCode}
                  </Typography>
                  <Button
                    onClick={copyLink}
                    size="small"
                    sx={{
                      backgroundColor: buttonColor,
                      color: dynamicPrimaryText,
                      mt: 3,
                      ml: 2,
                    }}
                  >
                    <Iconify icon="mdi:content-copy" />
                    Copy
                  </Button>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions
              sx={{
                backgroundColor,
              }}
            >
              <Button onClick={handleCancelDialog}>Cancel</Button>
              <Button
                onClick={handleConfirmRebuy}
                sx={{
                  backgroundColor: buttonColor,
                  color: dynamicPrimaryText,
                }}
              >
                <Iconify icon="mdi:cart-plus" />
                Go to Store
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
}
