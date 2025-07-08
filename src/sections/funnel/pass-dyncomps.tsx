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

import { _components } from 'src/_mock';
import { useDesign } from 'src/hooks/use-design';
import Labels from 'src/sections/widgets/basic/certificates/certificates';
import CustomWidget from 'src/sections/widgets/basic/customwidget';
import FooterWidget from 'src/sections/widgets/required/footer';
import ProductHead from 'src/sections/widgets/required/product-head';
import ProductInfo from 'src/sections/widgets/required/product-info/product-info';
import Messe from 'src/sections/widgets/retention/messe';
import Patos from 'src/sections/widgets/retention/patos';
import Storefinder from 'src/sections/widgets/retention/storefinder/storefinder';
import Origin from 'src/sections/widgets/sustainability/origin/origin';
import Recycling from 'src/sections/widgets/sustainability/recycling/recycling';
import Sustainability from 'src/sections/widgets/sustainability/sustainability/sustainability';

const Item = styled.div<{ $selected?: boolean; $design: IDesign }>`
  outline: ${(props) =>
    props.$selected ? `2px solid rgba(0, 171, 85, 1)` : '1px solid transparent'};
  border-radius: ${(props) =>
    `${props.$design.style.cards.cardDesign ? props.$design.style.cards.borderradius * 8.5 : 0}px`};
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
  preview: boolean;
  widget: IWidget;
  customComps?: IWidget[] | undefined;
  langIndex: number;
  selectedLabelId?: number;
  selectedDropId?: number;
  onClickNavItem?: (drop: number, labelId: number) => void;
  onDeleteWidget?: (drop: number, labelId: number) => void;
  selected?: boolean;
  handleChangeLang: (newLang: string) => void;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  onAccExpandSubWidget: (expanded: boolean, accId: string) => void;
  // optional for live
  tags?: string[] | undefined;
  analytics?: boolean;
};

const DynamicComponents: React.FC<Props> = ({
  widgetKey,
  labelId,
  preview,
  widget,
  customComps,
  langIndex,
  selectedLabelId,
  selectedDropId,
  onClickNavItem,
  onDeleteWidget,
  selected,
  handleChangeLang,
  onAccExpandWidget,
  onAccExpandSubWidget,
  tags,
  analytics,
}) => {
  // Define a mapping of component names to the actual component types
  const componentMap: { [key: string]: React.FC<Props> } = {
    // Widgets
    FooterWidget,
    Labels,
    ProductHead,
    ProductInfo,
    CustomWidget,
    Sustainability,
    Recycling,
    Patos,
    Messe,
    Origin,
    Story,
    Storefinder,
    // Components
    Heading,
    Subheading,
    Textblock,
    ActionButton,
    ShowcaseCarousel,
    ShowcaseImage,
    ShowcaseVideo,
    Document,
  };

  // Liste der Komponenten bei welchen der Name ausgeblendet wird
  const components = _components.map((component) => component.label.name);

  const ComponentToRender = componentMap[widget.name];

  const design = useDesign();

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
        onClick={() => {
          if (onClickNavItem) onClickNavItem(widget.drop, labelId || 0);
        }}
      >
        {ComponentToRender && (
          <ComponentToRender
            key={langIndex}
            widgetKey={widgetKey || ''}
            preview={preview}
            widget={widget}
            customComps={customComps}
            langIndex={langIndex}
            selected
            selectedLabelId={selectedLabelId}
            selectedDropId={selectedDropId}
            onClickNavItem={(drop, customLabelId) => {
              if (onClickNavItem) onClickNavItem(drop, customLabelId);
            }}
            onDeleteWidget={(drop, customLabelId) => {
              if (onDeleteWidget) onDeleteWidget(drop, customLabelId);
            }}
            handleChangeLang={handleChangeLang}
            onAccExpandWidget={onAccExpandWidget}
            onAccExpandSubWidget={onAccExpandSubWidget}
            tags={tags}
            analytics={analytics}
          />
        )}
      </Stack>
    </Item>
  );
};

export default DynamicComponents;
