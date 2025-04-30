// Update the startVoiceSearch function in Header.tsx
const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search not supported in this browser");
      return;
    }
  
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
  
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
  
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // Update search input with transcript
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput) searchInput.value = transcript;
    };
  
    recognition.start();
  };