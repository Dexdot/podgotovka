import React, { useCallback, useState } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { CommonModal } from '@/components/modals/CommonModal/CommonModal';
import { Button } from '@/components/common/Button/Button';

import cls from './CropModal.module.scss';

export interface CropModalPropsI {
  isOpen: boolean;
  close: () => void;
  url: string;
  onCropped: (b: Blob | null) => void;
  aspectRatio?: number;
  dimensions?: Cropper.GetCroppedCanvasOptions;
  mimeType?: 'image/jpeg' | 'image/png';
  quality?: number;
}

export const CropModal: React.FC<CropModalPropsI> = ({
  isOpen,
  close,
  url,
  aspectRatio,
  onCropped,
  dimensions,
  mimeType,
  quality
}) => {
  const [cropper, setCropper] = useState<Cropper>();

  const handleClick = useCallback(async () => {
    if (!cropper) {
      return;
    }
    const data = await new Promise<Blob | null>((resolve) => {
      cropper
        .getCroppedCanvas(dimensions)
        .toBlob((e) => resolve(e), mimeType, quality);
    });
    onCropped(data);
  }, [cropper, onCropped, dimensions, mimeType, quality]);

  return (
    <CommonModal isOpen={isOpen} close={close}>
      <div className={cls.container}>
        <div>
          <Cropper
            style={{ maxHeight: '70vh' }}
            src={url}
            initialAspectRatio={aspectRatio}
            guides={false}
            onInitialized={(e) => setCropper(e)}
            aspectRatio={aspectRatio}
            minCropBoxHeight={50}
            minCropBoxWidth={50}
            zoomable={false}
            checkOrientation={false}
          />
        </div>
        <div className={cls.button_wrap}>
          <Button onClick={handleClick}>Сохранить и продолжить</Button>
        </div>
      </div>
    </CommonModal>
  );
};

CropModal.defaultProps = {
  aspectRatio: undefined,
  dimensions: undefined,
  mimeType: 'image/jpeg',
  quality: 0.65
};
