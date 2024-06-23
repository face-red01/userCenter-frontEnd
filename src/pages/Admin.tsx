import { PageContainer } from '@ant-design/pro-components';
// import { PageHeader } from '@ant-design/pro-layout'
import '@umijs/max';
import React, { PropsWithChildren } from 'react';
const Admin: React.FC = (props: PropsWithChildren<any>) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>;
};
export default Admin;
