import { Divider, Stack } from '@mui/material';
import { useDesign } from 'src/hooks/use-design';
import CStorySection from 'src/sections/custom-components/c-story-section';
import { spacing } from 'src/styleguide';
import { IWidget } from 'src/types/product';

type Props = {
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  tags?: string[] | undefined;
  analytics?: boolean;
};

export default function Story({ widget, langIndex, onAccExpandWidget, tags, analytics }: Props) {
  const design = useDesign();
  const { childs } = widget;
  const story = childs[0].attributes;
  const margin = widget.style?.YMargin?.value[0];
  const orientation = widget.style?.Orientation?.value[0];

  return (
    <Stack sx={{ textAlign: orientation, alignItems: orientation }}>
      <Divider sx={{ borderStyle: 'dashed', mb: 1.5, mt: 0.5 }} />
      <CStorySection
        year={story.StoryTag.value[langIndex].val[0]}
        title={story.StoryTitle.value[langIndex].val[0]}
        image={story.StoryPicture.value[langIndex].val[0]}
        showImage={story.StoryShowPicture.value[langIndex].val[0] === 'X'}
        description={story.StoryLongDescription.value[langIndex].val[0]}
        design={design}
      />
      <Divider sx={{ borderStyle: 'dashed' }} />
    </Stack>
  );
}
