import React from 'react';
import { Label } from 'src/components/label';
import { IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';

type CustomChipProps = {
  label: string;
  idx?: number;
  onClick?: () => void;
  onDelete?: (index: number) => void;
  isTemplate?: boolean;
  sx?: React.CSSProperties;
};

const CustomChip: React.FC<CustomChipProps> = ({
  label,
  idx,
  onClick,
  onDelete,
  isTemplate,
  sx,
}) => {
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.substring(0, maxLength)  }...` : text;

  const truncatedLabel = truncateText(label, 20);

  if (isTemplate) {
    return (
      <Label variant="soft" color="info" sx={{ fontWeight: 'lighter', mr: 1 }}>
        {truncatedLabel}
        {onDelete && idx !== undefined && (
          <IconButton
            onClick={() => onDelete(idx)}
            size="small"
            style={{
              padding: 0,
              marginLeft: 2,
              color: '#206A9C',
            }}
          >
            <Iconify icon="basil:cross-outline" style={{ color: '#206A9C' }} />
          </IconButton>
        )}
      </Label>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Label
        onClick={onClick}
        style={{
          alignItems: 'center',
          backgroundColor: 'transparent',
          borderRadius: 8,
          borderColor: '#206A9C',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: '#206A9C',
          fontSize: 12,
          maxWidth: 'fit-content',
          fontWeight: 'lighter',
          paddingRight: 4,
          paddingLeft: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {truncatedLabel}
        {onDelete && idx !== undefined && (
          <IconButton
            onClick={() => onDelete(idx)}
            size="small"
            style={{
              padding: 0,
              marginLeft: 2,
              color: '#206A9C',
            }}
          >
            <Iconify icon="basil:cross-outline" style={{ color: '#206A9C' }} />
          </IconButton>
        )}
      </Label>
    </div>
  );
};

export default CustomChip;
