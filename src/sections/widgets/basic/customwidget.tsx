import { useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { Stack, useTheme } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { IDesign, IWidget } from 'src/types/product';
import { useDesign } from 'src/hooks/use-design';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useProductId } from 'src/hooks/use-product-id';
import { CustomWidgetIcon } from 'src/assets/icons/custom';
import { Iconify } from 'src/components/iconify';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import CCard from 'src/sections/custom-components/c-card';
import CAccordion from 'src/sections/custom-components/c-accordion-head';
import CHeading from 'src/sections/custom-components/c-heading';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import { accIconSize, spacingInnerWidgets } from 'src/styleguide';
import DynamicCustomComponents from './custom-dyncomps';

const Notice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 80px;
  font-family: 'PublicSans', sans-serif;
  font-size: 24px;
  color: #dfe3e8;
  box-shadow: none;
  background-color: transparent;
`;

type Props = {
  widgetKey?: string;
  preview?: boolean;
  widget: IWidget;
  customComps?: IWidget[];
  langIndex: number;
  selectedLabelId?: number;
  selectedDropId?: number;
  onDeleteWidget?: (drop: number, labelId: number) => void;
  onClickNavItem?: (drop: number, labelId: number) => void;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  tags?: string[] | undefined;
  analytics?: boolean;
};

// Hauptkomponente
export default function CustomWidget({
  widgetKey,
  preview,
  widget,
  customComps,
  langIndex,
  selectedLabelId,
  selectedDropId,
  onDeleteWidget,
  onClickNavItem,
  onAccExpandWidget,
  tags,
  analytics,
}: Props) {
  const theme = useTheme();
  const design = useDesign();
  const companyId = useCompanyId();
  const productId = useProductId();
  const { open } = widget;
  const accOpen = useBoolean(open);
  const sessionTrackerRef = useRef<SessionTrackerHandle>(null); // Apply the ref type here
  const matomoPath = `widget/${widget?.childs?.[0]?.attributes?.Custom_ID.value[langIndex].val[0]}/null/${companyId}/${productId}/${tags?.sort().join('/')}`;
  const trackId = `widget/${widget?.childs?.[0]?.attributes?.Custom_ID.value[langIndex].val[0]}/null/${productId}`;

  const { childs } = widget;
  const head = childs[0].attributes;

  const dropIdStr = head.DropId_CustomWidget?.value?.[langIndex]?.val?.[0];
  const dropId = dropIdStr ? +dropIdStr : 0;

  const cardColor = design.style.cards.color;
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;

  const handleAccordionChange = (expanded: boolean) => {
    accOpen.setValue(expanded);
    if (analytics) {
      if (expanded) {
        sessionTrackerRef.current?.startSession();
      } else {
        sessionTrackerRef.current?.endSession();
      }
    }
    onAccExpandWidget(expanded, widget.id);
  };

  useEffect(() => {
    if (accOpen.value === true && widget.open === false && analytics) {
      sessionTrackerRef.current?.endSession();
    }
    accOpen.setValue(widget.open);
  }, [accOpen, widget.open, analytics]);

  return (
    <CCard design={design}>
      {(analytics && widget.childs[0].attributes.Custom_ID.value[langIndex].val[0] !== undefined) &&(
        <SessionTracker
          ref={sessionTrackerRef}
          matomoPath={matomoPath}
          trackId={trackId}
          onSessionEnd={() => {}}
          onSessionTimeUpdate={() => {}}
        />
      )}
      <CAccordion
        preview={preview}
        design={design}
        summary={
          <>
            {head.WidgetIcon_CustomWidget?.value[langIndex]?.val[0] ? (
              <Stack sx={{ p: 0.1 }}>
                <Iconify
                  icon={head.WidgetIcon_CustomWidget.value[langIndex]?.val[0]}
                  color={design.style.icons.iconColor}
                  width={accIconSize}
                  height={accIconSize}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 0.1 }}>
                <CustomWidgetIcon
                  color={design.style.icons.iconColor}
                  width={accIconSize}
                  height={accIconSize}
                />
              </Stack>
            )}
            <CHeading
              value={head.WidgetHeadline_CustomWidget.value[langIndex]?.val[0]}
              fontHeadlines={design.typography.headlines.font}
              colorHeadlines={colorHeadlines}
              variant="h2"
              size={design.typography.headlines.size}
              fontWeight={design.typography.headlines.weight as 'regular' | 'bold'}
            />
          </>
        }
        expanded={accOpen.value}
        onExpandAccordion={handleAccordionChange}
      >
        {preview ? (
          <Droppable droppableId={dropIdStr} type="INNER">
            {(providedOuter) => (
              <div
                ref={providedOuter.innerRef}
                {...providedOuter.droppableProps}
                style={{ display: accOpen.value ? 'block' : 'none' }} // Hide visually, keep in DOM
              >
                <Stack spacing={spacingInnerWidgets[design.style.general.widgetSpacing]}>
                  {customComps && customComps.filter((comp) => comp.drop === dropId).length ? (
                    customComps
                      .filter((comp) => comp.drop === dropId)
                      .map((comp, index) => {
                        const isSelected =
                          selectedLabelId === index && selectedDropId === comp.drop;
                        return (
                          <Draggable
                            key={comp.id}
                            draggableId={comp.id}
                            index={index}
                            isDragDisabled={!isSelected} // Disable dragging if not selected
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...(isSelected ? provided.dragHandleProps : {})} // Apply dragHandle only if selected
                              >
                                <DynamicCustomComponents
                                  labelId={index}
                                  dropId={dropId}
                                  preview={preview}
                                  design={design}
                                  widget={comp}
                                  langIndex={langIndex}
                                  selected={isSelected}
                                  onClickNavItem={(drop, labelId) =>
                                    onClickNavItem?.(drop, labelId)
                                  }
                                  onDeleteWidget={(drop, labelId) =>
                                    onDeleteWidget?.(drop, labelId)
                                  }
                                  handleChangeLang={() => {}}
                                  onAccExpandWidget={() => {}}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })
                  ) : (
                    <Notice>Drop Here</Notice>
                  )}
                  {providedOuter.placeholder}
                </Stack>
              </div>
            )}
          </Droppable>
        ) : (
          <div>
            <Stack spacing={spacingInnerWidgets[design.style.general.widgetSpacing]}>
              {customComps && customComps.filter((comp) => comp.drop === dropId).length ? (
                customComps
                  .filter((comp) => comp.drop === dropId)
                  .map((comp, index) => (
                    <DynamicCustomComponents
                      key={index}
                      labelId={index}
                      dropId={dropId}
                      preview={false}
                      design={design}
                      widget={comp}
                      langIndex={langIndex}
                      selected={selectedLabelId === index && selectedDropId === comp.drop}
                      onClickNavItem={(drop, labelId) => {
                        if (onClickNavItem) onClickNavItem(drop, labelId);
                      }}
                      onDeleteWidget={(drop, labelId) => {
                        if (onDeleteWidget) onDeleteWidget(drop, labelId);
                      }}
                      handleChangeLang={() => {}}
                      onAccExpandWidget={() => {}}
                    />
                  ))
              ) : (
                <Notice>No Widgets Available</Notice>
              )}
            </Stack>
          </div>
        )}
      </CAccordion>
    </CCard>
  );
}
