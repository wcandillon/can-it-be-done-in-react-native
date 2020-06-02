#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

@class RCTBridge;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, readonly) RCTBridge *bridge;

@end
