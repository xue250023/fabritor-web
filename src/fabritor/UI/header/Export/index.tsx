import { Dropdown, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { downloadFile } from '@/utils';
import { useContext } from 'react';
import { GloablStateContext } from '@/context';

const items: MenuProps['items'] = [
  {
    key: 'jpg',
    label: '导出为 JPG'
  },
  {
    key: 'png',
    label: '导出为 PNG'
  },
  {
    key: 'svg',
    label: '导出为 SVG'
  },
  {
    key: 'json',
    label: '导出为 模板'
  }
]

export default function Export () {
  const { editor } = useContext(GloablStateContext);

  const handleClick = ({ key }) => {
    const { sketch } = editor;
    // @ts-ignore
    const name = sketch.fabritor_desc;
    switch (key) {
      case 'png':
        const png = editor.export2Img({ format: 'png' });
        downloadFile(png, 'png', name);
        break;
      case 'jpg':
        const jpg = editor.export2Img({ format: 'jpg' });
        downloadFile(jpg, 'jpg', name);
        break;
      case 'svg':
        const svg = editor.export2Svg();
        downloadFile(svg, 'svg', name);
        break;
      case 'json':
        const json = editor.export2Json();
        downloadFile(json, 'json', name);
        break;
      default:
        break;
    }
  }
  return (
    <div
      style={{
        width: 280,
        textAlign: 'right',
        paddingRight: 16
      }}
    >
      <Dropdown 
        menu={{ items, onClick: handleClick }} 
        arrow={{ pointAtCenter: true }}
        placement="bottom"
      >
        <Button type="primary" icon={<ExportOutlined />}>导出</Button>
      </Dropdown>
    </div>
  )
}