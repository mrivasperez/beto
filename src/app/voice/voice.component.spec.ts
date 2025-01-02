import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { VoiceComponent } from './voice.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

describe('VoiceComponent', () => {
  let component: VoiceComponent;
  let fixture: ComponentFixture<VoiceComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceComponent);
    component = fixture.componentInstance;
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize speechRecognition if supported', () => {
    expect(component.speechRecognition).toBeTruthy();
  });

  it('should not initialize speechRecognition if not supported', () => {
    // Temporarily remove SpeechRecognition from the window object
    const originalSpeechRecognition = (window as any).SpeechRecognition;
    const originalWebkitSpeechRecognition = (window as any)
      .webkitSpeechRecognition;
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;

    fixture = TestBed.createComponent(VoiceComponent);
    component = fixture.componentInstance;
    expect(component.speechRecognition).toBeNull();

    // Restore SpeechRecognition
    (window as any).SpeechRecognition = originalSpeechRecognition;
    (window as any).webkitSpeechRecognition = originalWebkitSpeechRecognition;
  });

  it('should start listening when startListening is called', () => {
    spyOn(component.speechRecognition, 'start');
    component.startListening();
    expect(component.speechRecognition.start).toHaveBeenCalled();
    expect(component.isListening).toBe(true);
  });

  it('should stop listening when stopListening is called', () => {
    spyOn(component.speechRecognition, 'stop');
    component.stopListening();
    expect(component.speechRecognition.stop).toHaveBeenCalled();
    expect(component.isListening).toBe(false);
  });

  it('should clear text when clearText is called', () => {
    component.transcribedText = 'Some text';
    component.clearText();
    expect(component.transcribedText).toBe('');
  });

  it('should copy text to clipboard when copyToClipboard is called', async () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    component.transcribedText = 'Text to copy';
    component.copyToClipboard();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Text to copy');
  });

  it('should update transcribedText on speechRecognition result', () => {
    const mockEvent = {
      resultIndex: 0,
      results: [
        [{ transcript: 'Hello' }],
        [{ transcript: ' world' }],
        [{ transcript: '.' }],
      ],
    };

    component.speechRecognition.onresult(mockEvent);
    expect(component.transcribedText).toBe('Hello world.');
  });

  it('should set isListening to false on speechRecognition end', () => {
    component.isListening = true;
    component.speechRecognition.onend();
    expect(component.isListening).toBe(false);
  });

  it('should set isListening to false on speechRecognition error', () => {
    component.isListening = true;
    const mockError = new Error('Recognition error');
    component.speechRecognition.onerror(mockError);
    expect(component.isListening).toBe(false);
  });

  it('should abort speechRecognition on ngOnDestroy', () => {
    spyOn(component.speechRecognition, 'abort');
    component.ngOnDestroy();
    expect(component.speechRecognition.abort).toHaveBeenCalled();
  });

  it('should toggle listening state when the button is clicked', () => {
    const button = fixture.debugElement.query(
      By.css('#toggle-listening-button')
    );

    // Initial state: not listening
    expect(component.isListening).toBe(false);

    // Click to start listening
    button.triggerEventHandler('click', null);
    expect(component.isListening).toBe(true);

    // Click to stop listening
    button.triggerEventHandler('click', null);
    expect(component.isListening).toBe(false);
  });

  it('should display the correct icon based on listening state', async () => {
    const button = fixture.debugElement.query(
      By.css('#toggle-listening-button')
    );
    fixture.detectChanges();
    await fixture.whenStable();

    // Not listening: display microphone icon
    let iconSpan = button.nativeElement.querySelector('span');
    expect(iconSpan.textContent).toBe('🎙️');

    // Start listening
    component.startListening();
    fixture.detectChanges();
    await fixture.whenStable();

    // Listening: display stop icon
    iconSpan = button.nativeElement.querySelector('span');
    expect(iconSpan.textContent).toBe('⏹️');
  });
  it('should display the transcribed text in the textarea', async () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));

    component.transcribedText = 'This is some text.';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(textarea.nativeElement.value).toBe('This is some text.');
  });

  it('should clear the textarea when the clear button is clicked', fakeAsync(() => {
    // Select the clear button using its ID
    const clearButton = fixture.debugElement.query(By.css('#clear-button'));

    component.transcribedText = 'Some text to clear.';
    fixture.detectChanges();

    // Simulate the click using dispatchEvent
    clearButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    expect(component.transcribedText).toBe('');
  }));

  it('should call copyToClipboard when the copy button is clicked', fakeAsync(() => {
    spyOn(component, 'copyToClipboard').and.callThrough();

    // Select the copy button using its ID
    const copyButton = fixture.debugElement.query(By.css('#copy-button'));

    // Simulate the click using dispatchEvent
    copyButton.nativeElement.dispatchEvent(new Event('click'));
    tick();

    expect(component.copyToClipboard).toHaveBeenCalled();
  }));
});
