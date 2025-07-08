import React from 'react';
import { IDesign, IWidget } from 'src/types/product';
import styled from 'styled-components';

import { Stack } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// Import the components you want to dynamically render
import ActionButton from 'src/sections/widget-components/action/actionbutton';
import Document from 'src/sections/widget-components/data/document';
import ShowcaseCarousel from 'src/sections/widget-components/showcase/showcasecarousel';
import ShowcaseImage from 'src/sections/widget-components/showcase/showcaseimage';
import ShowcaseVideo from 'src/sections/widget-components/showcase/showcasevideo';
import Story from 'src/sections/widget-components/showcase/story';
import Heading from 'src/sections/widget-components/text/heading';
import Subheading from 'src/sections/widget-components/text/subheading';
import Textblock from 'src/sections/widget-components/text/textblock';

const Item = styled.div<{ $selected?: boolean; $design: IDesign }>`
  border: ${(props) =>
    props.$selected ? `2px solid rgba(0, 171, 85, 1)` : '1px solid transparent'};
  border-radius: ${(props) => `${props.$design.style.cards.borderradius * 9.5}px`};
  position: relative;
`;

const WidgetHeader = styled.div<{ $isComponent: boolean }>`
  background-color: rgba(0, 171, 85, 0.64);
  padding: ${(props) => (props.$isComponent ? '0 6px 0 8px' : '0 12px 0 12px')};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: ${(props) => (props.$isComponent ? '0px' : '12px')};
  display: flex;
  align-items: center;
  position: absolute;
  top: 0px;
  right: ${(props) => (props.$isComponent ? '0px' : '48px')};
  z-index: 2;
`;

const ComponentName = styled.div`
  color: ${(props) => '#FFFFFF'};
  font-size: 10px;
  position: relative;
  top: -2px;
  z-index: 3;
`;

const DeleteButton = styled.div<{ $isComponent: boolean }>`
  color: white;
  cursor: pointer;
  padding-top: 4px;
  margin-left: ${(props) => (props.$isComponent ? '0px' : '4px')};
  &:hover {
    color: ${(props) => '#B71D18'};
  }
`;

type Props = {
  widgetKey?: string;
  labelId?: number;
  dropId?: number;
  preview: boolean;
  design: IDesign;
  widget: IWidget;
  langIndex: number;
  onClickNavItem?: (drop: number, labelId: number) => void;
  onDeleteWidget?: (drop: number, labelId: number) => void;
  selected?: boolean;
  handleChangeLang: (newLang: string) => void;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
};

const DynamicCustomComponents: React.FC<Props> = ({
  widgetKey,
  labelId,
  dropId,
  preview,
  design,
  widget,
  langIndex,
  onClickNavItem,
  onDeleteWidget,
  selected,
  handleChangeLang,
  onAccExpandWidget,
}) => {
  // Define a mapping of component names to the actual component types
  const componentMap: { [key: string]: React.FC<Props> } = {
    // Components
    Heading,
    Subheading,
    Textblock,
    ActionButton,
    ShowcaseCarousel,
    ShowcaseImage,
    ShowcaseVideo,
    Document,
    Story,
  };

  const components = [
    'Heading',
    'Subheading',
    'Textblock',
    'ActionButton',
    'ShowcaseCarousel',
    'ShowcaseImage',
    'ShowcaseVideo',
    'Document',
    'Story',
  ];

  const ComponentToRender = componentMap[widget.name];

  return (
    <Item $selected={selected} $design={design}>
      {selected && (
        <WidgetHeader $isComponent={components.includes(widget.name)}>
          {!components.includes(widget.name) && <ComponentName>{widget.label.name}</ComponentName>}
          <DeleteButton
            $isComponent={components.includes(widget.name)}
            onClick={() => {
              if (onDeleteWidget) onDeleteWidget(widget.drop, labelId || 0);
            }}
          >
            <Iconify icon="typcn:delete" />
          </DeleteButton>
        </WidgetHeader>
      )}
      <Stack
      // onClick={(e) => {
      //   e.stopPropagation();
      //   if (onClickNavItem) onClickNavItem(dropId || 1, labelId || 0);
      // }}
      >
        {ComponentToRender && (
          <ComponentToRender
            widgetKey={widgetKey || ''}
            preview={preview}
            design={design}
            widget={widget}
            langIndex={langIndex}
            selected
            handleChangeLang={handleChangeLang}
            onAccExpandWidget={onAccExpandWidget}
          />
        )}
      </Stack>
    </Item>
  );
};

export default DynamicCustomComponents;
