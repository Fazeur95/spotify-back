import { MenuOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
const columns = [
  {
    key: 'sort',
    width: 30,
  },
  {
    title: 'Order',
    dataIndex: 'order',
    width: 30,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
];
const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
    transition,
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, child => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: 'none',
                  cursor: 'move',
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};
const AlbumTable = ({ tracks, albumId }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(tracks.map((track, index) => ({ ...track, key: index })));
  }, [tracks]);

  const updateOrderRequest = async data => {
    const response = await fetch('http://localhost:6868/api/track/order', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        tracks: data,
        albumId,
      }),
    });

    return response.json();
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource(previous => {
        const activeIndex = previous.findIndex(i => i.key === active.id);
        const overIndex = previous.findIndex(i => i.key === over?.id);

        const data = arrayMove(previous, activeIndex, overIndex);

        data.forEach((track, index) => {
          track.order = index + 1;
        });

        updateOrderRequest(data);
        return data;
      });
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={dataSource.map(i => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={{
            body: {
              row: Row,
            },
          }}
          rowKey='key'
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </SortableContext>
    </DndContext>
  );
};
export default AlbumTable;
