import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

export let ActiveReactQuill: any;
export let icons: any;
export let modules: {
  toolbar:
    | string
    | {
    container: (
      | string[]
      | { color: string[] }[]
      | ({ align: string } | { align: string } | { align: string })[]
      | ({ list: string } | { list: string })[]
      )[]
  }
};

export let MagicUrl: { default: any };

type IProps = {
  value: any,
  handleChange: any,
  placeholder?: string,
  handleBlur?: any,
  toolbarId?: string,
  disabled?: boolean,
}

const ReactQuill = (props: IProps) => {
  const {
    value,
    handleChange,
    placeholder,
    handleBlur,
    toolbarId,
    disabled,
  } = props;
  const [showReactQuill, setShowReactQuill] = useState(false);
  modules = React.useMemo(
    () => ({
      toolbar: toolbarId || {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [
            {
              color: [
                '#000000',
                '#444444',
                '#666666',
                '#999999',
                '#cccccc',
                '#eeeeee',
                '#f3f3f3',
                '#ffffff',
                '#ff0000',
                '#ff9901',
                '#ffff00',
                '#01ff02',
                '#00ffff',
                '#1500ff',
                '#9900ff',
                '#ff01ff',
                '#cc0000',
                '#e69138',
                '#f1c132',
                '#6aa74f',
                '#45818e',
                '#3d85c6',
                '#664da7',
                '#a64d79',
              ],
            },
          ],
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote'],
          ['link'],
        ],
      },
    }),
    [MagicUrl],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require,no-undef
      ActiveReactQuill = require('react-quill');
      ActiveReactQuill = ActiveReactQuill.default;
      const { Quill } = ActiveReactQuill;
      const Lists = Quill.import('formats/list');
      Lists.className = 'quill-list';
      Quill.register(Lists, true);
      // eslint-disable-next-line global-require
      icons = ActiveReactQuill.Quill.import('ui/icons');
      // eslint-disable-next-line no-self-assign
      icons = icons;
      setShowReactQuill(true);
    }
  }, []);
  return (
    <React.Fragment>
      {showReactQuill ? (
        <ActiveReactQuill
          className={`qeditor-container`}
          modules={modules}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onBlur={handleBlur}
          bounds="#quill-editor"
          readOnly={disabled}
        />
      ) : null}
    </React.Fragment>
  );
};

export default ReactQuill;
