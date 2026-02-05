// Form Handler for HSTAI 777
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toISOString(),
                source: window.location.href,
                userAgent: navigator.userAgent
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.message || !formData.service) {
                alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
                return;
            }
            
            if (!window.validateEmail(formData.email)) {
                alert('Vui lòng nhập địa chỉ email hợp lệ');
                return;
            }
            
            if (formData.phone && !window.validatePhone(formData.phone)) {
                alert('Vui lòng nhập số điện thoại hợp lệ');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Đang gửi...';
            submitBtn.disabled = true;
            
            try {
                // In production, this would be a real API endpoint
                // For demo, we simulate API call
                await simulateAPICall(formData);
                
                // Show success message
                const messageDiv = document.getElementById('formMessage');
                if (messageDiv) {
                    messageDiv.style.display = 'block';
                    messageDiv.innerHTML = `
                        <h3>✅ Yêu cầu đã được gửi thành công!</h3>
                        <p>Cảm ơn <strong>${formData.name}</strong> đã liên hệ với HSTAI 777.</p>
                        <p>Chúng tôi sẽ liên hệ với bạn qua email <strong>${formData.email}</strong> trong vòng 24 giờ.</p>
                        <p><em>Mã tham chiếu: HSTAI-${Date.now().toString().slice(-6)}</em></p>
                    `;
                    
                    // Scroll to message
                    messageDiv.scrollIntoView({ behavior: 'smooth' });
                    
                    // Reset form
                    contactForm.reset();
                }
                
                // Log to console (in production, this would go to your backend)
                console.log('Form submitted successfully:', {
                    ...formData,
                    ip: 'Logged server-side'
                });
                
                // Optional: Send to analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'contact',
                        'event_label': formData.service
                    });
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Có lỗi xảy ra khi gửi biểu mẫu. Vui lòng thử lại sau.');
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Simulate API call (replace with actual fetch in production)
    async function simulateAPICall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({
                        success: true,
                        messageId: `HSTAI-${Date.now()}`,
                        timestamp: new Date().toISOString()
                    });
                } else {
                    reject(new Error('Network error simulated'));
                }
            }, 1500);
        });
    }
    
    // Auto-fill phone prefix
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Auto-add Vietnam prefix
            if (value && !value.startsWith('+')) {
                if (value.startsWith('0')) {
                    value = '+84' + value.substring(1);
                } else if (value.length <= 10) {
                    value = '+84' + value;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Service selection effects
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function(e) {
            const selectedValue = e.target.value;
            const messageField = document.getElementById('message');
            
            if (messageField && !messageField.value) {
                const templates = {
                    training: 'Tôi quan tâm đến khóa đào tạo Solopreneur. Vui lòng gửi thông tin chi tiết về lộ trình và chi phí.',
                    consulting: 'Cần tư vấn về việc mở rộng doanh nghiệp ra thị trường ASEAN. Vui lòng liên hệ sớm.',
                    implementation: 'Muốn triển khai hệ thống V MASTER cho doanh nghiệp. Cần báo giá chi tiết.',
                    partnership: 'Quan tâm đến mô hình hợp tác đối tác. Vui lòng gửi thông tin hợp tác.',
                    other: 'Tôi có nhu cầu tư vấn về...'
                };
                
                if (templates[selectedValue]) {
                    messageField.value = templates[selectedValue];
                }
            }
        });
    }
    
    // Form field validation on blur
    const formFields = contactForm ? contactForm.querySelectorAll('input, select, textarea') : [];
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        if (field.required && !value) {
            showFieldError(field, 'Trường này là bắt buộc');
            return false;
        }
        
        if (fieldId === 'email' && value && !window.validateEmail(value)) {
            showFieldError(field, 'Email không hợp lệ');
            return false;
        }
        
        if (fieldId === 'phone' && value && !window.validatePhone(value)) {
            showFieldError(field, 'Số điện thoại không hợp lệ');
            return false;
        }
        
        clearFieldError(field);
        return true;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#dc3545';
    }
    
    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }
    
    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.textAlign = 'right';
        counter.style.fontSize = '0.875rem';
        counter.style.color = '#666';
        counter.style.marginTop = '5px';
        
        messageField.parentNode.appendChild(counter);
        
        function updateCounter() {
            const length = messageField.value.length;
            counter.textContent = `${length}/1000 ký tự`;
            
            if (length > 800) {
                counter.style.color = '#ff6f00';
            } else if (length > 950) {
                counter.style.color = '#dc3545';
            } else {
                counter.style.color = '#666';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
});