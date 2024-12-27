import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Component({
  selector: 'app-voice',
  imports: [],
  templateUrl: './voice.component.html',
  styleUrl: './voice.component.css',
})
export class VoiceComponent implements OnDestroy {
  isListening = false;
  transcribedText = '';
  speechRecognition: any | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.speechRecognition = new ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition)();
      this.speechRecognition.lang = 'es-ES';
      this.speechRecognition.continuous = true; // Enable continuous transcription
      this.speechRecognition.interimResults = true; // Show interim results
      this.speechRecognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        this.transcribedText = transcript;
        this.cdr.detectChanges(); // Trigger change detection after updating the transcribedText
      };

      this.speechRecognition.onstart = () => {};
      this.speechRecognition.onend = () => {
        this.isListening = false;
      };
      this.speechRecognition.onerror = (error: any) => {
        this.isListening = false;
        console.error('Speech recognition error:', error);
      };
    } else {
      console.error('Browser does not support Speech Recognition API');
    }
  }

  startListening() {
    if (this.speechRecognition) {
      this.transcribedText = ''; // clear the transcribed text on start.
      this.isListening = true;
      this.speechRecognition.start();
    }
  }

  stopListening() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
      this.isListening = false;
    }
  }

  clearText() {
    this.transcribedText = '';
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.transcribedText);
  }

  ngOnDestroy(): void {
    if (this.speechRecognition) {
      this.speechRecognition.abort();
    }
  }
}
