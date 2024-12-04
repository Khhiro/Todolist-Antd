import React, { useState } from 'react';
import { Table, Button, Modal, Input, Form, Select, Space } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const UsersTable = () => {

  const [users, setUsers] = useState([
    { key: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { key: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ]);


  const [searchText, setSearchText] = useState('');


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);


  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleAddUser = (values) => {
    setUsers([...users, { ...values, key: users.length + 1 }]);
    setIsModalVisible(false);
  };


  const handleEditUser = (values) => {
    const updatedUsers = users.map(user =>
      user.key === editingUser.key ? { ...user, ...values } : user
    );
    setUsers(updatedUsers);
    setIsModalVisible(false);
    setEditingUser(null);
  };


  const handleDeleteUser = (key) => {
    setUsers(users.filter(user => user.key !== key));
  };


  const showAddModal = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      id: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      id: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      id: 'status',
      render: (text) => (
        <Select defaultValue={text} style={{ width: 120 }}>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            type="primary"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.key)}
            type="danger"
          />
        </Space>
      ),
    },
  ];


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: '300px' }}
        prefix={<SearchOutlined />}
      />

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="key"
        pagination={false}
      />

      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={showAddModal}
        style={{ marginTop: 16 }}
      >
        Add New User
      </Button>

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingUser}
          onFinish={editingUser ? handleEditUser : handleAddUser}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status' }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser ? 'Save Changes' : 'Add User'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersTable;
