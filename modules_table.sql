-- Create modules table for menu structure with parent-child relationships
CREATE TABLE modules (
    module_id INT PRIMARY KEY AUTO_INCREMENT,
    module_name VARCHAR(100) NOT NULL,
    module_code VARCHAR(50) NOT NULL UNIQUE,
    parent_id INT NULL,
    route_path VARCHAR(200) NULL,
    icon VARCHAR(50) NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES modules(module_id) ON DELETE CASCADE
);

-- Insert parent modules (main sections)
INSERT INTO modules (module_name, module_code, parent_id, route_path, icon, display_order) VALUES
('CRM', 'CRM', NULL, NULL, 'business_center', 1),
('Requests', 'REQUESTS', NULL, NULL, 'request_quote', 2),
('Accounts', 'ACCOUNTS', NULL, '/app/Client_Master', 'account_circle', 3),
('Finance', 'FINANCE', NULL, NULL, 'account_balance_wallet', 4),
('Payments', 'PAYMENTS', NULL, NULL, 'payment', 5),
('Reports', 'REPORTS', NULL, NULL, 'analytics', 6),
('Security', 'SECURITY', NULL, NULL, 'shield', 7);

-- Insert CRM child modules
INSERT INTO modules (module_name, module_code, parent_id, route_path, icon, display_order) VALUES
('Leads', 'LEADS', 1, '/app/Lead', 'person_search', 1),
('Opportunities', 'OPPORTUNITIES', 1, '/app/Opportunity', 'trending_up', 2),
('Proposals', 'PROPOSALS', 1, '/app/Proposal', 'description', 3),
('Subscription Form', 'SUBSCRIPTION_FORM', 1, '/app/Subscription', 'card_membership', 4),
('Smart Login Import', 'SMART_LOGIN_IMPORT', 1, '/app/Smart_Login_Import', 'cloud_download', 5),
('Trial Management', 'TRIAL_MANAGEMENT', 1, '/app/Trial_Request', 'free_breakfast', 6),
('Trial Extend', 'TRIAL_EXTEND', 1, '/app/Trial_Extend', 'schedule', 7),
('Action Log', 'ACTION_LOG', 1, '/app/Action_Log', 'history', 8);

-- Insert Requests child modules
INSERT INTO modules (module_name, module_code, parent_id, route_path, icon, display_order) VALUES
('New Subscription', 'NEW_SUBSCRIPTION', 2, '/app/New_Subscription', 'add_circle', 1),
('Change Bill Commercial', 'CHANGE_BILL_COMMERCIAL', 2, '/app/Commercial', 'business', 2),
('Change Bill Non-Commercial', 'CHANGE_BILL_NON_COMMERCIAL', 2, '/app/NonCommercial', 'home', 3),
('Stop Bill', 'STOP_BILL', 2, '/app/StopBill', 'stop_circle', 4),
('Salvage Disconnect', 'SALVAGE_DISCONNECT', 2, '/app/Salvage_Disconnect', 'power_off', 5);

-- Insert Finance child modules
INSERT INTO modules (module_name, module_code, parent_id, route_path, icon, display_order) VALUES
('Currency Conversion', 'CURRENCY_CONVERSION', 4, '/app/Currency_Conversion', 'currency_exchange', 1),
('Invoice Management', 'INVOICE_MANAGEMENT', 4, '/app/Manual_Invoice', 'receipt', 2),
('Invoice Generate', 'INVOICE_GENERATE', 4, '/app/Invoice_Generate', 'receipt', 3),
('Invoice PDF Generate', 'INVOICE_PDF_GENERATE', 4, '/app/Invoice_PDF_Generate', 'picture_as_pdf', 4),
('Subscriber Mapping', 'SUBSCRIBER_MAPPING', 4, '/app/Subscriber_Mapping', 'hub', 5),
('Start Bill Invoice', 'START_BILL_INVOICE', 4, '/app/StartBill', 'play_arrow', 6),
('Stop Bill Invoice', 'STOP_BILL_INVOICE', 4, '/app/Stop_Bill_Generate', 'stop', 7),
('Change Bill Commercial Generate', 'CHANGE_BILL_COMMERCIAL_GENERATE', 4, '/app/Change_Bill_Commercial', 'receipt', 8),
('Change Bill Non-Commercial Generate', 'CHANGE_BILL_NON_COMMERCIAL_GENERATE', 4, '/app/Change_Bill_NonCommercial', 'receipt', 9),
('Debit Note / Credit Note', 'DEBIT_CREDIT_NOTE', 4, '/app/Debit_Credit_Note', 'swap_horiz', 10),
('Generate GST JSON', 'GENERATE_GST_JSON', 4, '/app/GST_JSON_Generate', 'data_object', 11),
('GST Acknowledgement Upload', 'GST_ACKNOWLEDGEMENT_UPLOAD', 4, '/app/GST_Upload_Ack', 'cloud_upload', 12),
('TDS Management', 'TDS_MANAGEMENT', 4, '/app/TDS_Management', 'percent', 13),
('Invoice Other', 'INVOICE_OTHER', 4, '/app/Invoice_Other', 'delete_sweep', 14);

-- Insert Payments child modules
INSERT INTO modules (module_name, module_code, parent_id, route_path, icon, display_order) VALUES
('Payment Receipt', 'PAYMENT_RECEIPT', 5, '/app/Payments', 'account_balance', 1),
('Export to Tally', 'EXPORT_TO_TALLY', 5, '/app/TallyExport', 'file_upload', 2);

-- Insert Reports child modules
INSERT INTO modules (module_name, module_code, parent_id, route_path, icon, display_order) VALUES
('Sales Register', 'SALES_REGISTER', 6, '/app/SalesRegister', NULL, 1),
('Sales Register (ID wise)', 'SALES_REGISTER_ID_WISE', 6, '/app/SalesRegisterIDWise', NULL, 2),
('Price Change Tracker', 'PRICE_CHANGE_TRACKER', 6, '/app/PriceTracker', NULL, 3),
('Subscription Tracker', 'SUBSCRIPTION_TRACKER', 6, '/app/SubscriptionTracker', NULL, 4),
('Billed Revenue Report', 'BILLED_REVENUE_REPORT', 6, '/app/BilledRevenue', NULL, 5),
('Unbilled Revenue Report', 'UNBILLED_REVENUE_REPORT', 6, '/app/UnbilledRevenue', NULL, 6),
('Invoice Bifurcation', 'INVOICE_BIFURCATION', 6, '/app/InvoiceBifurcation', NULL, 7),
('Pending Report', 'PENDING_REPORT', 6, '/app/PendingReport', NULL, 8),
('Collection Report', 'COLLECTION_REPORT', 6, '/app/CollectionReport', NULL, 9),
('Pending Bucket', 'PENDING_BUCKET', 6, '/app/PendingBucket', NULL, 10),
('Customer Segmentations', 'CUSTOMER_SEGMENTATIONS', 6, '/app/CustomerSegments', NULL, 11),
('Subscribers Export', 'SUBSCRIBERS_EXPORT', 6, '/app/SubscribersExport', NULL, 12),
('Invoice Export', 'INVOICE_EXPORT', 6, '/app/InvoiceExport', NULL, 13),
('Audit Reports', 'AUDIT_REPORTS', 6, '/app/AuditReports', NULL, 14);

-- Insert Security child modules
INSERT INTO modules (module_name, module_code, parent_id, route_path, icon, display_order) VALUES
('User Groups', 'USER_GROUPS', 7, '/app/UserGroups', 'group', 1),
('Users', 'USERS', 7, '/app/Users', 'person', 2);