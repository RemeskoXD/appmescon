-- KROK 1: Vytvoření základní struktury databáze (Role, Uživatelé, Zákazníci)

-- Tabulka pro Role (RBAC)
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vložení základních 10 rolí
INSERT IGNORE INTO `roles` (`name`, `description`) VALUES
('ADMIN', 'Root přístup, vidí a může editovat vše. Zastropuje provize.'),
('MODERATOR', 'Vidí vše (kromě Secret a Dark Money), nemůže mazat data. Spravuje provize.'),
('SUPPORT', 'Spravuje helpdesk, edituje info o zákaznících, přidává aktivity.'),
('DEVELOPER_OP', 'Pokročilý vývojář. Vidí přiřazené projekty a zákazníky.'),
('DEVELOPER_JUNIOR', 'Začátečník. Omezený pohled pouze na přidělenou práci.'),
('SALES_OP', 'Zkušený prodejce. Přidává leady, weby, edituje zákazníky, nahrává faktury.'),
('SALES_JUNIOR', 'Nováček prodejce. Vidí pouze své přidělené zákazníky.'),
('DESIGNER', 'Vidí pouze zákazníky a zakázky, na kterých přímo pracuje.'),
('EXTERNAL', 'Externista. Vidí produkty k prodeji, slevy a své provize.'),
('CUSTOMER_CARE', 'Pečuje o klienty, vymýšlí dárky, sleduje profily, řeší recenze.');

-- Tabulka pro Uživatele (Zaměstnanci, Externisté, případně klienti s přístupem)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `role_id` INT NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `company_name` VARCHAR(255) DEFAULT NULL,
  `ico` VARCHAR(20) DEFAULT NULL,
  `dic` VARCHAR(20) DEFAULT NULL,
  `street` VARCHAR(255) DEFAULT NULL,
  `city` VARCHAR(100) DEFAULT NULL,
  `zip` VARCHAR(20) DEFAULT NULL,
  `bank_account` VARCHAR(100) DEFAULT NULL,
  `referral_code` VARCHAR(50) DEFAULT NULL UNIQUE,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vložení hlavního Admin účtu (Heslo je nutné v aplikaci zahashovat pomocí bcrypt, toto je jen placeholder pro ukázku)
-- V produkci nikdy neukládáme heslo v plain textu! Aplikace ho při prvním spuštění nebo seedování zahashuje.
-- Prozatím vložíme dummy hash, který se musí přepsat přes aplikaci.
INSERT IGNORE INTO `users` (`email`, `password_hash`, `first_name`, `last_name`, `role_id`) 
VALUES ('ludvikremeskework@gmail.com', '$2y$10$DUMMY_HASH_PLEASE_CHANGE_VIA_APP', 'Ludvík', 'Admin', 1);

-- Tabulka pro Zákazníky (CRM)
CREATE TABLE IF NOT EXISTS `customers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT DEFAULT NULL, -- Propojení na tabulku users, pokud má zákazník přístup do Klientského portálu
  `company_name` VARCHAR(255) DEFAULT NULL,
  `contact_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `total_spent` DECIMAL(15, 2) DEFAULT 0.00, -- Celková útrata
  `loyalty_status` ENUM('NONE', '1_YEAR', '3_YEARS', 'LIFETIME') DEFAULT 'NONE', -- Věrnostní systém
  `customer_status` ENUM('VIP', 'BIG', 'NEW', 'POTENTIAL', 'TEAM', 'NEW_WEB', 'STANDARD') DEFAULT 'NEW', -- Top filtry
  `owner_id` INT DEFAULT NULL, -- Kdo zákazníka vlastní (Sales OP, Admin atd.)
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabulka pro Weby (Evidence projektů)
CREATE TABLE IF NOT EXISTS `websites` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `status` ENUM('ACTIVE', 'INACTIVE', 'IN_PROGRESS', 'NEW', 'UNSPECIFIED') DEFAULT 'NEW',
  `tech_stack` VARCHAR(255) DEFAULT NULL,
  
  -- Finanční a časové údaje
  `price_sold` DECIMAL(15, 2) DEFAULT 0.00,
  `monthly_hosting_fee` DECIMAL(10, 2) DEFAULT 0.00,
  `monthly_maintenance_fee` DECIMAL(10, 2) DEFAULT 0.00,
  `domain_price` DECIMAL(10, 2) DEFAULT 0.00,
  
  -- Expirace
  `domain_expires_at` DATE DEFAULT NULL,
  `hosting_paid_until` DATE DEFAULT NULL,
  `maintenance_paid_until` DATE DEFAULT NULL,
  
  -- Přiřazení lidé
  `developer_id` INT DEFAULT NULL,
  `sales_id` INT DEFAULT NULL,
  `manager_id` INT DEFAULT NULL,
  
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`developer_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`sales_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`manager_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabulka pro Tickety (Helpdesk a úkoly)
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') DEFAULT 'OPEN',
  `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
  `customer_id` INT DEFAULT NULL,
  `assigned_to` INT DEFAULT NULL,
  `created_by` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabulka pro Faktury
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `invoice_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_id` INT NOT NULL,
  `website_id` INT DEFAULT NULL,
  `amount` DECIMAL(15, 2) NOT NULL,
  `status` ENUM('UNPAID', 'PAID', 'OVERDUE') DEFAULT 'UNPAID',
  `due_date` DATE NOT NULL,
  `paid_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`website_id`) REFERENCES `websites`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabulka pro Provize
CREATE TABLE IF NOT EXISTS `commissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `website_id` INT DEFAULT NULL,
  `amount` DECIMAL(15, 2) NOT NULL,
  `status` ENUM('PENDING', 'APPROVED', 'PAID') DEFAULT 'PENDING',
  `description` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`website_id`) REFERENCES `websites`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabulka pro Leady (Potenciální zákazníci)
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT DEFAULT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `source` VARCHAR(50) DEFAULT 'REGISTRATION',
  `status` ENUM('NEW', 'CONTACTED', 'CONVERTED', 'REJECTED') DEFAULT 'NEW',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
