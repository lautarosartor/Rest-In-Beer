import { Card, Col, Row, Space, Typography } from "antd";
import useStyles from "hooks/useStyles";
import { memo } from "react";

const Header = ({ title, subtitle, breadcrumb, actions }) => {
  if (!title && !actions && !breadcrumb) return null;

  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Space orientation="vertical" size={0}>
          {title && (
            <Typography.Title level={4} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
          )}

          {subtitle && (
            <Typography.Text type="secondary">
              {subtitle}
            </Typography.Text>
          )}
        </Space>
      </Col>

      {actions && (
        <Col>
          <Space>{actions}</Space>
        </Col>
      )}
    </Row>
  );
};

const ContentWithHeader = ({
  children,
  title,
  subtitle,
  breadcrumb,
  actions,
  noCard = false
}) => {
  const { wrapperStyles } = useStyles();

  return (
    <>
      <Card className="content-header-card">
        {breadcrumb}
        <Header
          title={title}
          subtitle={subtitle}
          breadcrumb={breadcrumb}
          actions={actions}
        />
      </Card>

      {children &&
        (noCard ? (
          <div style={wrapperStyles}>
            {children}
          </div>
        ) : (
          <Card
            size="small"
            style={wrapperStyles}
          >
            {children}
          </Card>
        ))
      }
    </>
  );
};

export default memo(ContentWithHeader);
