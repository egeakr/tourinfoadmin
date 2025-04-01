import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Popconfirm, Form, message, Input, Spin } from 'antd';
import axios from 'axios';

const EditableContext = React.createContext(null);

// Optimize edilmiş EditableRow bileşeni
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// Performans iyileştirmeli EditableCell
const EditableCell = React.memo(({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext);

  const toggleEdit = () => setEditing(prev => !prev);

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      message.error(`Validasyon hatası: ${errInfo.errorFields[0]?.errors[0]}`);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item 
        style={{ margin: 0 }} 
        name={dataIndex}
        rules={[{ required: true, message: `${title} zorunlu alan!` }]}
      >
        <Input 
          autoFocus 
          onPressEnter={save}
          onBlur={save}
          data-testid={`edit-input-${dataIndex}`}
        />
      </Form.Item>
    ) : (
      <div 
        className="editable-cell-value-wrap" 
        onClick={toggleEdit}
        style={{ 
          padding: '5px', 
          cursor: 'pointer',
          minHeight: '32px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {children || <span style={{ color: '#bfbfbf' }}>Tıklayarak düzenle</span>}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
});

const EditableTable = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/location');
      setData(data.map(item => ({ ...item, key: item._id })));
    } catch (error) {
      message.error('Veri çekilemedi!');
    } finally {
      setLoading(false);
    }
  };

  const isEditing = record => record.key === editingKey;

  const edit = record => setEditingKey(record.key);

  const cancel = () => setEditingKey('');

  const save = async row => {
    try {
      await axios.put(`/api/location?id=${row.key}`, row);
      message.success('Başarıyla güncellendi!');
      await fetchData(); // Verileri yeniden çek
    } catch (err) {
      message.error('Güncelleme başarısız!');
      await fetchData(); // Hata durumunda verileri resetle
    }
    setEditingKey('');
  };

  const columns = [
    { title: 'İl Adı', dataIndex: 'il', editable: true, width: '10%' },
    { title: 'İlçe Adı', dataIndex: 'ilce', editable: true, width: '12%' },
    { title: 'Kategori', dataIndex: 'kategori', editable: true, width: '12%' },
    { title: 'Başlık', dataIndex: 'baslik', editable: true, width: '15%' },
    { title: 'Latitude', dataIndex: 'latitude', editable: true, width: '12%' },
    { title: 'Longitude', dataIndex: 'longitude', editable: true, width: '12%' },
    { title: 'Açıklama', dataIndex: 'description', editable: true, width: '20%' },
    {
      title: 'İşlemler',
      dataIndex: 'actions',
      width: '15%',
      render: (_, record) => (
        isEditing(record) ? (
          <span className="action-buttons">
            <Button 
              type="primary" 
              onClick={() => save(record)}
              style={{ marginRight: 8 }}
            >
              Kaydet
            </Button>
            <Popconfirm 
              title="Değişiklikleri iptal etmek istiyor musunuz?"
              onConfirm={cancel}
              okText="Evet"
              cancelText="Hayır"
            >
              <Button danger>İptal</Button>
            </Popconfirm>
          </span>
        ) : (
          <Button 
            type="link" 
            onClick={() => edit(record)}
            disabled={editingKey !== ''}
            style={{ color: '#1890ff' }}
          >
            Düzenle
          </Button>
        )
      )
    }
  ];

  const mergedColumns = columns.map(col => ({
    ...col,
    onCell: record => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave: save,
    }),
  }));

  return (
    <Spin spinning={loading} tip="Yükleniyor...">
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        rowKey="key"
        style={{ 
          margin: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />
    </Spin>
  );
};

export default EditableTable;