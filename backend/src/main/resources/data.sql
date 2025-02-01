-- Insert roles
INSERT INTO roles (name) VALUES ('ROLE_VIEWER');
INSERT INTO roles (name) VALUES ('ROLE_EDITOR');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');

-- Insert admin user (password is 'admin123')
INSERT INTO users (username, email, password) 
VALUES ('admin', 'admin@example.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6');

-- Assign admin role to admin user
INSERT INTO user_roles (user_id, role_id) 
SELECT u.id, r.id FROM users u, roles r 
WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN';

-- Insert sample articles
INSERT INTO articles (title, content, created_at, author_id) 
SELECT 
    'Breaking News: AI Revolution in Healthcare',
    'Artificial Intelligence is transforming healthcare in unprecedented ways. Recent breakthroughs in machine learning algorithms have enabled more accurate diagnosis and treatment planning. Hospitals worldwide are adopting AI-powered systems to improve patient care and streamline operations. This technological revolution promises to make healthcare more accessible and efficient than ever before.',
    CURRENT_TIMESTAMP - 1,
    u.id
FROM users u WHERE u.username = 'admin';

INSERT INTO articles (title, content, created_at, author_id)
SELECT 
    'Climate Change: Global Initiative Launches',
    'A groundbreaking global initiative to combat climate change was announced today. World leaders have committed to reducing carbon emissions by 50% by 2030. The initiative includes massive investments in renewable energy and sustainable infrastructure. Scientists are calling this a crucial step towards preventing catastrophic climate impacts.',
    CURRENT_TIMESTAMP - 2,
    u.id
FROM users u WHERE u.username = 'admin';

INSERT INTO articles (title, content, created_at, author_id)
SELECT 
    'Tech Giants Announce Quantum Computing Breakthrough',
    'Major tech companies have achieved a significant breakthrough in quantum computing. The new quantum processor can perform calculations in minutes that would take traditional supercomputers thousands of years. This development could revolutionize fields from cryptography to drug discovery. Experts predict widespread applications within the next decade.',
    CURRENT_TIMESTAMP - 3,
    u.id
FROM users u WHERE u.username = 'admin';

INSERT INTO articles (title, content, created_at, author_id)
SELECT 
    'Space Tourism: First Commercial Flight Success',
    'The era of space tourism has officially begun with the successful launch and return of the first commercial space flight. Civilian passengers experienced weightlessness and breathtaking views of Earth from low orbit. This milestone marks the beginning of accessible space travel for the general public, though ticket prices remain high.',
    CURRENT_TIMESTAMP - 4,
    u.id
FROM users u WHERE u.username = 'admin';

INSERT INTO articles (title, content, created_at, author_id)
SELECT 
    'Revolutionary Battery Technology Unveiled',
    'Scientists have developed a new type of battery that could solve energy storage challenges. The innovative technology offers five times the capacity of current lithium-ion batteries while charging in just minutes. This breakthrough could accelerate the adoption of electric vehicles and renewable energy systems worldwide.',
    CURRENT_TIMESTAMP - 5,
    u.id
FROM users u WHERE u.username = 'admin';
